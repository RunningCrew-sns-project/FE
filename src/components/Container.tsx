

export interface ResponsiveContainerProps {
  children: React.ReactNode;
}



export const ResponsiveContainer  = ({children } :ResponsiveContainerProps ) => {
  return(
    <div className="mx-auto max-w-[90%] tablet:max-w-[90%] laptop:max-w-[95%] desktop:max-w-[1440px] ">
      {children}
    </div>
  )
}

