import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';
import Swal from 'sweetalert2';
import axios from 'axios';

function DowloadGraph() {
  const [data, setData] = useState([]);

  const fetchDownloadData = async () => {
    try {
      const response = await axios.get('/api/getNombreTelechTheme', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      
      // Formatage des données pour le graphique Google Charts
      const chartData = [['Theme', 'Nombre de téléchargements']];
      const  donne = response.data;
    
      donne.forEach(item => {
        chartData.push([item.name, item.totalDownloads]);
      });

      setData(chartData);
    } catch (error) {
      Swal.fire({
        text: `Erreur lors de la récupération des données: ${error}`,
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    fetchDownloadData();
  }, []);

  const chartOptions = {
    title: 'Nombre de téléchargements par thème',
    is3D: true,  // Option pour afficher en 3D
    pieHole: 0.4,  // Si tu veux un graphique en anneau (pie donut)
  };

  return (
    <div className="container mt-5">
      <h3>Graphique des téléchargements</h3>
      {data.length > 1 ? (
        <Chart
          width={'600px'}
          height={'400px'}
          chartType="PieChart"
          loader={<div>Chargement du graphique...</div>}
          data={data}
          options={chartOptions}
          rootProps={{ 'data-testid': '1' }}
        />
      ) : (
        <div>Chargement des données...</div>
      )}
    </div>
  );
}

export default DowloadGraph;
