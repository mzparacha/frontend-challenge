import { ReactElement } from "react"

// Props
type Props = {
  children: ReactElement[] | ReactElement | string
}
const Layout = (props: Props) => {
  const { children } = props;
  // Render
  return (
    <>
      <div className="z-[3] h-[80px] w-full fixed">
        <div className="h-[40px] bg-black absolute w-full">
          <img src="/img/Mortal-Kombat-Logo.png" alt="Mortal Kombatt Logo" className="h-[80px] w-auto mx-auto" />
        </div>
      </div>
      <div className="h-[80px] w-full mb-4"></div>
      {children}
    </>

  )
}

export default Layout