import React from "react"
import ContentLoader from "react-content-loader"

interface MyLoaderProps {
  className?: string; // Propiedad opcional para la clase CSS
}

const MyLoader: React.FC<MyLoaderProps> = ({ className, ...props }) => (
  <ContentLoader 
    speed={2}
    viewBox="0 0 400 350"
    backgroundColor="#e0e0e0"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="337" y="15" rx="0" ry="0" width="21" height="0" /> 
    <rect x="68" y="124" rx="5" ry="5" width="300" height="60" /> 
    <rect x="69" y="198" rx="5" ry="5" width="300" height="60" /> 
    <rect x="141" y="289" rx="8" ry="8" width="140" height="50" /> 
    <rect x="315" y="95" rx="0" ry="0" width="1" height="0" /> 
    <rect x="90" y="57" rx="5" ry="5" width="250" height="10" /> 
    <rect x="66" y="34" rx="5" ry="5" width="300" height="10" /> 
    <rect x="67" y="78" rx="5" ry="5" width="300" height="10" />
  </ContentLoader>
)

export default MyLoader