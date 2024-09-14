"use client"
import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    gap:10,
    padding: '16px',
    width: '100%'
  },
  sectionHead: {
    width: '100%',
    height: 300,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  containImage: {
    width:'50%',
    aspectRatio:1/1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containTextImage: {
    width:'50%',
    aspectRatio:1/1,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    gap: 10,
  },
  titulo: {
    width: '100%',
    textAlign:"center",
    backgroundColor: '##f1e4de',
    color: '#0b7fab',
    textTransform:"capitalize",
    fontSize: '28px',
    fontWeight: 'bold',
  },
  titulo2: {
    marginTop: 0,
    width: '100%',
    textAlign:"center",
    backgroundColor: '##f1e4de',
    color: '#0b7fab',
    textTransform:"capitalize",
    fontSize: '28px',
    fontWeight: 'bold',
  },
  findoType:{
    position: "absolute",
    top: '50%',
    right: '50%',
    transform: 'translate(50%, -50%) rotate(-35deg)',
    fontSize: 28,
    color: '#f4d75e',
    fontWeight: 'bold',
    opacity: 0.7,
    zIndex:10,
  },
  findoType2:{
    position: "absolute",
    width: '50%',
    top: '50%',
    right: '50%',
    transform: 'translate(50%, -50%) rotate(-35deg)',
    fontSize: 20,
    color: '#f1e4de',
    fontWeight: 'bold',
    opacity: 0.7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    flexDirection: 'column',
    zIndex: 10,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 5,
    border: '1px solid #e9723d',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  containGrafic: {
    width:'100%', 
    height:400, 
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',
  }
});

interface resultPreguntas {
  type: string;
  name: string;
}

interface ResultadoDominante {
  type: string;
  name: string;
  description: string;
  imagePath: string;
}

interface ResultadoGrafica {
  name: string;
  value: number;
}

interface Resultado {
  type: string;
  points: number;
}

interface Props {
  resultPreguntas: resultPreguntas[] | null;
  resultadoDominante: ResultadoDominante | null;
  resultadoGrafica: ResultadoGrafica[] | null;
  resultado: Resultado[] | null;
}


// Create Document Component
export const MyDocumentLider: React.FC<Props> = ({ resultPreguntas, resultadoDominante, resultadoGrafica, resultado }) => {

  const getImagenes = (val: string | undefined) => {
    const valMin = val?.toLowerCase()
    switch (valMin) {
      case "influencia idealizada":
        return "https://res.cloudinary.com/dpiwmbsog/image/upload/v1710806051/DevSphere/influenciaIdealizada2_npohes.jpg";
      case "motivación inspiracional":
        return "https://res.cloudinary.com/dpiwmbsog/image/upload/v1710806052/DevSphere/motivacionInspiracional4_kihlom.jpg";
      case "estimulación intelectual":
        return "https://res.cloudinary.com/dpiwmbsog/image/upload/v1710806049/DevSphere/estimulacionIntelectual3_jak9mc.jpg"
      case "atención personal e individual":
        return "https://res.cloudinary.com/dpiwmbsog/image/upload/v1710806048/DevSphere/atencionPersonalIndividual3_uojion.jpg"
        default:
          return 'https://res.cloudinary.com/dpiwmbsog/image/upload/v1710910632/DevSphere/estimulacionIntelectual1_l9or3u.jpg';
    }
  }

  // console.log("res")
  const pieChartData = resultadoGrafica || [];
  const totalValue = pieChartData.reduce((acc, item) => acc + item.value, 0);
  // console.log("total value", totalValue)

  const sortedChartData = pieChartData.slice().sort((a, b) => b.value - a.value);

  const colors = [{color:'#0b7fab', position:'topLeft'},{color:'#e9723d', position:'topRight'},{color:'#f4d75e', position:'bottomLeft'},{color:'#7c7b89', position:'bottomRight'}]
  console.log(sortedChartData)

  const calcPosition = (val: string | undefined) => {
    switch (val) {
      case "topLeft":
        return {bottom:0, right:0 };
      case "topRight":
        return {left:0, bottom:0 } ;
      case "bottomLeft":
        return {top:0, right:0 };
      case "bottomRight":
        return {top:0 ,left:0 };
        default:
          return '';
    }
  }

  const calcRadius = (val: string | undefined) => {
    switch (val) {
      case "topLeft":
        return {borderTopLeftRadius:'200%'};
      case "topRight":
        return {borderTopRightRadius:'300%'} ;
      case "bottomLeft":
        return {borderBottomLeftRadius:'400%'};
      case "bottomRight":
        return {borderBottomRightRadius:'500%'};
        default:
          return '';
    }
  }
  sortedChartData
  const sliceStyle2 = {
    width:`${sortedChartData[0]?.value * 150 / totalValue }%`, 
    height:`${sortedChartData[0]?.value * 150 / totalValue }%`, backgroundColor:`${colors[0].color}`,
    position: 'absolute', 
    zIndex: 0,
    ...calcPosition(colors[0].position) ,
    ...calcRadius(colors[0].position) ,
  }

  return ( 
    <Document style={{width:'595px', height:'842px',backgroundColor:'#FFF', display:'flex' ,flexDirection: 'column', alignItems:'flex-start', padding:'16px' }}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.titulo}>Resultados</Text>
        <View style={styles.sectionHead}>
          <View style={styles.containImage}>
            <Image style={styles.image} src={getImagenes(resultadoDominante?.type)} source={getImagenes(resultadoDominante?.type)} />
          </View>
          <View style={styles.containTextImage}>
            <Text style={{fontSize:20, fontWeight:'bold', textTransform:'capitalize', color:'#e9723d'}}>{resultadoDominante?.name}</Text>
            <Text style={{fontSize:14, color:'#7c7b89'}}>{resultadoDominante?.description}</Text>
            <Text style={styles.findoType}>{resultadoDominante?.type}</Text> 
          </View>
        </View>
          <Text style={styles.titulo2}>Grafico {}</Text>
          {/* este es el contain del grafico */}
          <View style={styles.containGrafic}>
            {/* este es el grafico */}
            <View style={{width: resultado ? 10*resultado.length : 150, height: resultado ? 10*resultado.length : 150, borderRadius: '100%', display: 'flex', flexDirection:'row', flexWrap:'wrap', justifyContent: 'center', alignItems:'center',overflow:'hidden', position:'relative' }}>

            {/* top left */}
            <View style={{width:'50%',height:'50%', position:'relative', overflow:'hidden'}}>
              <View style={{
                width:`${sortedChartData[0]?.value * 150 / totalValue }%`, 
                height:`${sortedChartData[0]?.value * 150 / totalValue }%`, backgroundColor:`${colors[0].color}`,
                position: 'absolute', 
                zIndex: 0,
                ...calcPosition(colors[0].position) ,
                ...calcRadius(colors[0].position) ,
              }} />
              <Text style={styles.findoType2}>{sortedChartData[0]?.name}</Text>
            </View>
            {/* top right */}
            <View style={{width:'50%',height:'50%', position:'relative', overflow:'hidden'}}>
              <View style={{
                width:`${sortedChartData[1]?.value * 150 / totalValue }%`, 
                height:`${sortedChartData[1]?.value * 150 / totalValue }%`, backgroundColor:`${colors[1].color}`,
                position: 'absolute', 
                zIndex: 0,
                ...calcPosition(colors[1].position) ,
                ...calcRadius(colors[1].position) ,
              }} />
              <Text style={styles.findoType2}>{sortedChartData[1]?.name}</Text>
            </View>
            {/* bottom left */}
            <View style={{width:'50%',height:'50%', position:'relative', overflow:'hidden'}}>
              <View style={{
                width:`${sortedChartData[2]?.value * 150 / totalValue }%`, 
                height:`${sortedChartData[2]?.value * 150 / totalValue }%`, backgroundColor:`${colors[2].color}`,
                position: 'absolute', 
                zIndex: 0,
                ...calcPosition(colors[2].position) ,
                ...calcRadius(colors[2].position) ,
              }} />
              <Text style={styles.findoType2}>{sortedChartData[2]?.name}</Text>
            </View>
            {/* bottom right */}
              {/* right */}
            <View style={{width:'50%',height:'50%', position:'relative', overflow:'hidden'}}>
              <View style={{
                width:`${sortedChartData[3]?.value * 150 / totalValue }%`, 
                height:`${sortedChartData[3]?.value * 150 / totalValue }%`, backgroundColor:`${colors[3].color}`,
                position: 'absolute', 
                zIndex: 0,
                ...calcPosition(colors[3].position) ,
                ...calcRadius(colors[3].position) ,
              }} />
              <Text style={styles.findoType2}>{sortedChartData[3]?.name}</Text>
            </View>
            </View>
          </View>
      </Page>
    </Document>
    )
}

export const DownloadPdfLider: React.FC<Props> = ({ resultPreguntas, resultadoDominante, resultadoGrafica, resultado }) => (
  
    <PDFDownloadLink document={<MyDocumentLider resultPreguntas={resultPreguntas} resultadoDominante={resultadoDominante} resultadoGrafica={resultadoGrafica} resultado={resultado}/>} fileName="resultado_test_liderazgo.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Cargando...' : 'Descargar PDF')}
    </PDFDownloadLink>
  
);