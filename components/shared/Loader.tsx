export const Loader = ({dark}:any) => {
  return (
    <>
    <div className={`${!dark ? "lds-ellipsis" : "lds-ellipsis dark"} `}><div></div><div></div><div></div><div></div></div>
    </>
  )
}
