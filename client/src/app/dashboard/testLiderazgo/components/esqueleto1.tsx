import React from "react"
import ContentLoader from "react-content-loader"

interface MyLoaderProps{
  className?: string;
}

const MyLoader: React.FC<MyLoaderProps> = (props) => (
  <ContentLoader 
    speed={2}
    width={500}
    height={420}
    viewBox="0 0 500 420"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="79" y="17" rx="3" ry="3" width="370" height="10" /> 
    <rect x="315" y="78" rx="3" ry="3" width="150" height="10" /> 
    <rect x="337" y="15" rx="0" ry="0" width="21" height="0" /> 
    <rect x="37" y="122" rx="0" ry="0" width="210" height="195" /> 
    <circle cx="396" cy="303" r="84" /> 
    <rect x="307" y="102" rx="3" ry="3" width="170" height="10" /> 
    <rect x="298" y="125" rx="3" ry="3" width="190" height="10" /> 
    <rect x="309" y="150" rx="3" ry="3" width="170" height="10" /> 
    <rect x="319" y="172" rx="3" ry="3" width="150" height="10" />
  </ContentLoader>
)

export default MyLoader