provider "aws" {
  region = "ap-south-1"
}


# Configure Terraform backend to use S3
terraform {
  backend "s3" {
    bucket = "terraform-snappcoins"
    key    = "terraform.tfstate"  # You can customize the key as needed
    region = "ap-south-1"
  }
}

# Create VPC
resource "aws_vpc" "my_vpc" {
  cidr_block          = "10.0.0.0/16"
  enable_dns_support  = true
  enable_dns_hostnames = true
  tags = {
    Name = "${var.environment_name}-vpc"
  }
}

# Create Subnets
resource "aws_subnet" "subnet_a" {
  depends_on = [
    aws_vpc.my_vpc
  ]
  
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-south-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "${var.environment_name}-subnet-a"
  }
}

resource "aws_subnet" "subnet_b" {
  depends_on = [
    aws_vpc.my_vpc
  ]
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "ap-south-1b"
  map_public_ip_on_launch = true
  tags = {
    Name = "${var.environment_name}-subnet-b"
  }
}

# Create Private Subnets
resource "aws_subnet" "private_subnet_a" {
  depends_on = [
    aws_vpc.my_vpc,
    aws_subnet.subnet_a
  ]
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.3.0/24"
  availability_zone       = "ap-south-1a"
  tags = {
    Name = "${var.environment_name}-private-subnet-a"
  }
}

resource "aws_subnet" "private_subnet_b" {
  depends_on = [
    aws_vpc.my_vpc,
    aws_subnet.subnet_b
  ]
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.4.0/24"
  availability_zone       = "ap-south-1b"
  tags = {
    Name = "${var.environment_name}-private-subnet-b"
  }
}

# Create Internet Gateway
resource "aws_internet_gateway" "my_igw" {
  depends_on = [
    aws_vpc.my_vpc,
    aws_subnet.subnet_a,
    aws_subnet.subnet_b
  ]

  vpc_id = aws_vpc.my_vpc.id
  tags = {
    Name = "${var.environment_name}-igw"
  }
}

# Creating a Route Table for the public subnet
resource "aws_route_table" "Public-Subnet-RT" {
  depends_on = [
    aws_vpc.my_vpc,
    aws_internet_gateway.my_igw
  ]

  # VPC ID
  vpc_id = aws_vpc.my_vpc.id

  # NAT Rule
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my_igw.id
  }

  tags = {
    Name = "${var.environment_name}-Route-Table-for-Internet-Gateway"
  }
}

# Creating a resource for the Route Table Association with subnet_a
resource "aws_route_table_association" "RT-IG-Association-a" {
  depends_on = [
    aws_vpc.my_vpc,
    aws_subnet.subnet_a,
    aws_subnet.subnet_b,
    aws_route_table.Public-Subnet-RT
  ]

  # Public Subnet ID
  subnet_id      = aws_subnet.subnet_a.id

  #  Route Table ID
  route_table_id = aws_route_table.Public-Subnet-RT.id
}

# Creating a resource for the Route Table Association with subnet_b
resource "aws_route_table_association" "RT-IG-Association-b" {
  depends_on = [
    aws_vpc.my_vpc,
    aws_subnet.subnet_a,
    aws_subnet.subnet_b,
    aws_route_table.Public-Subnet-RT
  ]

  # Public Subnet ID
  subnet_id      = aws_subnet.subnet_b.id

  #  Route Table ID
  route_table_id = aws_route_table.Public-Subnet-RT.id
}

# Creating an Elastic IP for the NAT Gateway
resource "aws_eip" "Nat-Gateway-EIP" {
  vpc = true
  tags = {
    Name = "${var.environment_name}-nat-eip"
  }
}

# Creating a NAT Gateway
resource "aws_nat_gateway" "NAT_GATEWAY" {
  depends_on = [
    aws_eip.Nat-Gateway-EIP,
    aws_internet_gateway.my_igw
  ]

  # Allocating the Elastic IP to the NAT Gateway
  allocation_id = aws_eip.Nat-Gateway-EIP.id

  # Associating it in the Public Subnet
  subnet_id = aws_subnet.subnet_a.id
  tags = {
    Name = "${var.environment_name}-Nat-Gateway_Project"
  }
}

# Creating a Route Table for the Nat Gateway
resource "aws_route_table" "NAT-Gateway-RT" {
  depends_on = [
    aws_nat_gateway.NAT_GATEWAY
  ]

  vpc_id = aws_vpc.my_vpc.id

  route {
    cidr_block      = "0.0.0.0/0"
    nat_gateway_id  = aws_nat_gateway.NAT_GATEWAY.id
  }

  tags = {
    Name = "${var.environment_name}-Route-Table-for-NAT-Gateway"
  }
}

# Create a new Route Table for the Private Subnet
resource "aws_route_table" "Private-Subnet-RT" {
  depends_on = [
    aws_vpc.my_vpc,
    aws_nat_gateway.NAT_GATEWAY
  ]

  vpc_id = aws_vpc.my_vpc.id

  route {
    cidr_block      = "0.0.0.0/0"
    nat_gateway_id  = aws_nat_gateway.NAT_GATEWAY.id
  }

  tags = {
    Name = "${var.environment_name}-Route-Table-for-Private-Subnet"
  }
}

# Creating an Route Table Association of the NAT Gateway route 
# table with the Private Subnet!
resource "aws_route_table_association" "Private-Subnet-RT-Association-a" {
  depends_on = [
    aws_route_table.Private-Subnet-RT
  ]

  subnet_id      = aws_subnet.private_subnet_a.id
  route_table_id = aws_route_table.Private-Subnet-RT.id
}

# Creating an Route Table Association of the NAT Gateway route 
# table with the Private Subnet!
resource "aws_route_table_association" "Private-Subnet-RT-Association-b" {
  depends_on = [
    aws_route_table.Private-Subnet-RT
  ]

  subnet_id      = aws_subnet.private_subnet_b.id
  route_table_id = aws_route_table.Private-Subnet-RT.id
}

# Creating an AWS IAM role for the cluster
resource "aws_iam_role" "eks-iam-role" {
  name = "${var.environment_name}-eks-iam-role"

  path = "/"

  assume_role_policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
  {
   "Effect": "Allow",
   "Principal": {
    "Service": "eks.amazonaws.com"
   },
   "Action": "sts:AssumeRole"
  }
 ]
}
EOF
}

# Attaching policies to the cluster
resource "aws_iam_role_policy_attachment" "AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.eks-iam-role.name
}

resource "aws_iam_role_policy_attachment" "AmazonEC2ContainerRegistryReadOnly-EKS" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.eks-iam-role.name
}

# Creating a cluster
resource "aws_eks_cluster" "snappcoins-eks" {
  name     = "snappcoins-cluster"
  role_arn = aws_iam_role.eks-iam-role.arn

  vpc_config {
    subnet_ids = [
      aws_subnet.subnet_a.id,
      aws_subnet.subnet_b.id,
      aws_subnet.private_subnet_a.id,
      aws_subnet.private_subnet_b.id
    ]
  }

  depends_on = [
    aws_iam_role.eks-iam-role,
  ]
}

# Creating roles for nodes
resource "aws_iam_role" "workernodes" {
  name = "${var.environment_name}-eks-node-group-example"

  assume_role_policy = jsonencode({
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
    Version = "2012-10-17"
  })
}

# Attaching policies to nodes
resource "aws_iam_role_policy_attachment" "AmazonEKSWorkerNodePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.workernodes.name
}

resource "aws_iam_role_policy_attachment" "AmazonEKS_CNI_Policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.workernodes.name
}

resource "aws_iam_role_policy_attachment" "EC2InstanceProfileForImageBuilderECRContainerBuilds" {
  policy_arn = "arn:aws:iam::aws:policy/EC2InstanceProfileForImageBuilderECRContainerBuilds"
  role       = aws_iam_role.workernodes.name
}

resource "aws_iam_role_policy_attachment" "AmazonEC2ContainerRegistryReadOnly" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.workernodes.name
}

# Create a nodegroup
resource "aws_eks_node_group" "example" {
  cluster_name    = aws_eks_cluster.snappcoins-eks.name
  node_group_name = "${var.environment_name}-example-node-group"

  node_role_arn = aws_iam_role.workernodes.arn

  subnet_ids = [
    aws_subnet.private_subnet_a.id,
    aws_subnet.private_subnet_b.id
  ]

  scaling_config {
    desired_size = 1
    max_size     = 1
    min_size     = 1
  }
  ami_type       = "AL2_x86_64"
  instance_types = ["t2.large"]
  capacity_type  = "ON_DEMAND"
  disk_size      = 30

  depends_on = [
    aws_iam_role_policy_attachment.AmazonEKSWorkerNodePolicy,
    aws_iam_role_policy_attachment.AmazonEC2ContainerRegistryReadOnly,
    aws_iam_role_policy_attachment.AmazonEKS_CNI_Policy,
    aws_eks_cluster.snappcoins-eks
  ]
}
