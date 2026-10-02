const Overview = () => {
  const date = new Date()

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="bg-white">
      <p>{formattedDate}</p>
    </div>
  )
}

export default Overview