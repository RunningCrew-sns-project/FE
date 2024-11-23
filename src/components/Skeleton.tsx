

interface  SkeletonProps {
  type: 'box';
  width?: string;
  height?: string;
  borderRadius?: string;  
  margin?: string;
}


const Skeleton = ({type, width, height, borderRadius , margin} : SkeletonProps) => {
  const skeletonClass  = () => {
    switch(type){
      case 'box' : 
      return `w-[${width}] h-[${height}] bg-gray-300 ${borderRadius} animate-pulse ${margin}`;
    }
  }

  return(
    <>
      <div className={skeletonClass()} />
    </>
  )
}

export default Skeleton