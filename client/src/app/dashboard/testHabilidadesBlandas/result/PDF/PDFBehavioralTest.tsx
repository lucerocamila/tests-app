import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, PDFDownloadLink, Image } from '@react-pdf/renderer';
import dynamic from 'next/dynamic'; // Importamos dynamic desde Next.js

interface PDFBehavioralTestProps {
  data: {
    mostProminentSkill: string;
    percentages: number[];
  };
}
const MyDocument = dynamic(() => import('./PDFBehavioralTest'), {
  ssr: false, // Desactivamos el SSR para este componente
});
const PDFBehavioralTest: React.FC<PDFBehavioralTestProps> = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getColor = (mostProminentSkill: string) => {
    switch (mostProminentSkill) {
      case 'Habilidades de Liderazgo':
        return 'red';
      case 'Habilidades personales':
        return '#0bb474';
      case 'Habilidades Profesionales':
        return 'yellow';
      default:
        return '';
    }
  };

  const getDescription = (mostProminentSkill: string) => {
    switch (mostProminentSkill) {
      case 'Habilidades de Liderazgo':
        return 'Las habilidades de liderazgo son aquellas que te permiten motivar e inspirar a otras personas para que den lo mejor de sí mismas y logren los objetivos comunes, usando tu visión, tu influencia y tu ejemplo. ¡Estas habilidades son imprescindibles para tu desarrollo y tu éxito profesional, y también para tu contribución y tu impacto social!';
      case 'Habilidades personales':
        return 'Las Habilidades personales son aquellas que te permiten conocerte y valorarte a ti mismo, manejar tus emociones y tu estrés, y adaptarte a los cambios y a las situaciones nuevas. ¡Estas habilidades son fundamentales para tu bienestar y tu felicidad, y también para tu desarrollo personal y profesional!';
      case 'Habilidades Profesionales':
        return 'Las habilidades profesionales son aquellas que te permiten desempeñar tu trabajo o tu estudio de forma eficaz y eficiente, usando tus conocimientos, tus recursos y tus herramientas. ¡Estas habilidades son esenciales para tu desarrollo y tu competitividad profesional, y también para tu satisfacción y tu realización personal!';
      default:
        return '';
    }
  };

  const getImageSrc = (mostProminentSkill: string) => {
    switch (mostProminentSkill) {
      case 'Habilidades de Liderazgo':
        return 'https://i.postimg.cc/pX0xCQvS/habilidadliderazgo.png';
      case 'Habilidades personales':
        return 'https://i.postimg.cc/8PkNLK2W/habilidadpersonal.png';
      case 'Habilidades Profesionales':
        return 'https://i.postimg.cc/7Zf4WCYZ/habilidadprofesional.png';
      default:
        return '';
    }
  };

  const generatePDF = () => (
    <Document>
      <Page style={{ flexDirection: 'column', alignItems: 'flex-start', padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginLeft: 'auto', marginRight: 'auto' }}>Tu Resultado:</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>Tus fortalezas se inclinan a:</Text>
            <Text style={{ fontSize: 18, color: '#0b91b4', fontWeight: 'bold' }}>{data?.mostProminentSkill}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
          <Image src={getImageSrc(data?.mostProminentSkill)} style={{ width: 200, height: 200 }} />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Barra con porcentajes</Text>
          {data?.percentages.map((percentage, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: 'black' }}>
                {data?.mostProminentSkill}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: `${percentage}%`, height: 20, backgroundColor: getColor(data?.mostProminentSkill), borderRadius: 10 }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>{percentage.toFixed(2)}%</Text>
                </View>
                <Text style={{ marginLeft: 10, color: 'black' }}>{percentage.toFixed(2)}%</Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={{ fontSize: 14, marginBottom: 10 }}>{getDescription(data?.mostProminentSkill)}</Text>
      </Page>
    </Document>
  );

  return (
    <>
      {isClient && (
        <PDFDownloadLink document={generatePDF()} fileName="resultado_habilidades_Blandas.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Generando...' : 'Descargar en PDF')}
        </PDFDownloadLink>
      )}
    </>
  );
};

export default PDFBehavioralTest;
