import React from "react"
import ContentLoader from "react-content-loader"

interface MyCardProps {
  customClass?: string; // Propiedad opcional para la clase CSS
}
const MyCardHome: React.FC<MyCardProps> = ({ customClass, ...props }) => (
  <ContentLoader 
    speed={2}
    // width={240}
    // height={320}
    viewBox="0 0 240 320"
    backgroundColor="#e0e0e0"
    foregroundColor="#ecebeb"
    className={`${customClass}`}
    {...props}
  >
    <rect x="337" y="15" rx="0" ry="0" width="21" height="0" /> 
    <rect x="11" y="25" rx="5" ry="5" width="218" height="119" /> 
    <rect x="23" y="171" rx="5" ry="5" width="193" height="126" /> 
    <rect x="315" y="95" rx="0" ry="0" width="1" height="0" />
  </ContentLoader>
)

export default MyCardHome