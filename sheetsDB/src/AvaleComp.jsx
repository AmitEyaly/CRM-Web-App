import { Link } from "react-router-dom"

const AvaleComp = () => {
  return (
    <div>
      <h1>is it avalable?</h1>
      <iframe 
      src="https://calendar.google.com/calendar/embed?src=259bfd00a0dbdfecd01d5f5af90711ba7c876e2535f6dee48bba5f65e706da55%40group.calendar.google.com&ctz=Asia%2FJerusalem" 
      title="Example Website" 
      width="800" 
      height="600" 
    />
    <br />
      <button><Link to="/">חזרה</Link></button>
    </div>
  )
}

export default AvaleComp
