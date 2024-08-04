import React, { useCallback, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch-gamer';

const Analytics = (props) => {

  const [fetchData, { loading }] = useFetch();

  const [analytics,setAnalytics] = useState(null)

  const fetchAnalytics = useCallback(() => {

    if (!props.id) {
      return; // Return early if user ID is not available
    }

    const config = {
      url: `http://localhost:3004/api/profile/gamer-analytics/${props.id}`,
      method: "get",
    };

    return fetchData(config, { showSuccessToast: true })
      .then((data) => {
        console.log(data)
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData,props.id]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetchAnalytics();
        console.log(response)
        if (response) {
          setAnalytics(response.gamesList)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnalyticsData();
  }, [fetchAnalytics]);


  return (
    <div class="container m-4">
    <div class="d-flex align-items-center justify-content-center m-10">
  <table class="border border-2 border-color-white">
    <thead>
      <tr>
        <th class="border border-2 border-color-white px-3">Games played</th>
        <th class="border border-2 border-color-white px-3">Snapps Collected</th>
      </tr>
    </thead>
    <tbody>
      {analytics && analytics.map((item) => {<tr>
        <td class="border border-2 border-color-white px-3">{item.name}</td>
        <td class="border border-2 border-color-white px-3">{item.moneyWon}  Snapps Earned</td>
      </tr>})}
      {/* <!-- These are for demo remove them after games are implemented --> */}
      <tr>
        <td class="border border-2 border-color-white px-3">Alpha Games</td>
        <td class="border border-2 border-color-white px-3">1000  Snapps Earned</td>
      </tr>
      <tr>
        <td class="border border-2 border-color-white px-3">Ludo</td>
        <td class="border border-2 border-color-white px-3">500  Snapps Earned</td>
      </tr>
    {/* untill here */}
    </tbody>
  </table>
</div>

    </div>

  )
}

export default Analytics
