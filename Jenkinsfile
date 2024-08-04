pipeline {
options {
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '4'))
  }
  


    agent any

    environment {    
        ECR_REGION = 'ap-south-1'
        ECR_REGISTRY = '083118395813.dkr.ecr.ap-south-1.amazonaws.com'
        KUBECONFIG_PATH = '/new/directory/path/config'
        //BRANCH_NAME= 'qa-env'
      //  VERSION = '1.0.0'
        
    }

    stages {
         stage('Configure AWS') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'f457fa0c-671e-4380-a0fc-a931d9f7d87c']]) {
                        sh 'aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID'
                        sh 'aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY'
                        sh 'aws configure set region ap-south-1'
                        
                    }
                }
            }
        }
        
        stage('Terraform Init') {
            steps {
                script {
                    
                    sh 'terraform init --force-copy'
                }
            }
        }

        stage('validate') {
            steps {
                sh 'terraform validate'                
            }
        }
        stage('plan') {
            steps {
                sh 'terraform plan'
            }
        }
        stage('action') {
            steps {
               // sh 'terraform apply -var="environment_name=dev" --auto-approve'
             sh "terraform apply --auto-approve"

            }
        }

       stage('Install Istio') {
            steps {
                script {
                    // Download and install Istio
                    sh "curl -L https://istio.io/downloadIstio | ISTIO_VERSION=1.19.3 TARGET_ARCH=x86_64 sh -"
                    dir("istio-1.19.3") {
                         sh "aws eks update-kubeconfig --name snappcoins-cluster --region ap-south-1"
                        sh "export PATH=$PWD/bin:$PATH"
                        sh "/path/to/new_directory/istioctl install --set profile=default -y"
                    //  sh "kubectl create ns dev"
                      //sh "kubectl create ns qa"
                      //sh "kubectl create ns prod"
                      // sh "kubectl label namespace prod istio-injection=enabled"
                        // sh "kubectl label namespace dev istio-injection=enabled"
                         // sh "kubectl label namespace qa istio-injection=enabled"
                       
                        // Check if the 'prod' namespace exists
                def namespaceExists = sh(script: "kubectl get ns prod --ignore-not-found", returnStatus: true).toInteger() == 0

                if (!namespaceExists) {
                    // 'prod' namespace does not exist, create it
                    sh "kubectl create ns prod"
                }
                sh "kubectl config set-context --current --namespace=prod"
                       //sh "kubectl label namespace prod istio-injection=enabled --overwrite=false"
                       // Check if the 'istio-injection' label is already set in 'prod' namespace
                def labelExists = sh(script: "kubectl get ns prod -o jsonpath='{.metadata.labels.istio-injection}' --ignore-not-found", returnStatus: true).toInteger() == 0

                if (!labelExists) {
                    // 'istio-injection' label does not exist, set it
                    sh "kubectl label namespace prod istio-injection=enabled"
                    
                } else {
                    echo "istio-injection label already exists in the 'prod' namespace."
                }
                    }
                    

                    
                }
            }
        }

     
          
        
         
      stage('Conditional Job Trigger') {
            steps {
                script {
                    // Add your condition here
                    def shouldTriggerNextJob = input(
                        id: 'triggerConfirmation',
                        message: 'Do you want to trigger the next job?',
                        parameters: [
                            [$class: 'BooleanParameterDefinition', defaultValue: false, description: 'Proceed with triggering?', name: 'TRIGGER']
                        ]
                    )

                    if (shouldTriggerNextJob) {
                     //input message: 'Do you want to trigger rollback?', parameters: [string(name: 'ROLLBACK_VERSION', //defaultValue: params.IMAGE_VERSION, description: 'Specify the version to rollback to')]
                      //  build job: 'snappcoins-rollback', parameters: [string(name: 'ROLLBACK_VERSION', value: env.ROLLBACK_VERSION)], wait: false
                        def userInput = input(message: 'Enter some value:', parameters: [string(name: 'BRANCH_NAME', defaultValue: '', description: 'User input value')])
                    build job: 'new-snappcoins', parameters: [string(name: 'BRANCH_NAME', value: userInput)]
                        
                    } else {
                        echo 'Not triggering the next job.'
                    }
                }
            }
        }
        }
        

             
 post {
        always {
            script {
                // Ask for user confirmation before destroying Terraform resources
                def userInput = input(
                    id: 'destroyConfirmation',
                    message: 'Do you want to destroy Terraform resources?',
                    parameters: [
                        [$class: 'BooleanParameterDefinition', defaultValue: false, description: 'Proceed with destruction?', name: 'CONFIRM']
                    ]
                )

                if (userInput) {
                     sh "kubectl delete namespace istio-system"

                    // If user confirms, destroy Terraform resources
                    sh 'terraform destroy --auto-approve'
                                        //echo 'Sleeping for 25 minutes...'
                    //sleep(time: 25 * 60)  // 25 minutes in seconds

                } else {
                    echo 'Skipping Terraform destruction.'
                }
            }
        }
}
   

    

    }
    