import React,{ useState }  from 'react'
import Alarm from './Alarm'

const Navbar = () => {

  const [page, setpage] = useState('home')

  return (
    <nav className='flex justify-center-safe align-middle md:gap-38  bg-slate-800 text-white py-2 m-auto'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>TaskU</span>
        </div>
      <ul className="flex gap-8 mx-9 md:pl-14">
        <li className='cursor-pointer hover:font-bold transition-all' >  Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        <li className='cursor-pointer hover:font-bold transition-all' onClick={()=>setpage('alarm')}>Alarm</li>
      </ul>
      <div>
        {/* {page === "home" && <Home />}
        {page === "about" && <About />} */}
        {page === "alarm" && <Alarm />}
      </div>
    </nav>
  )
}

export default Navbar

// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// function NavbarComponent() {
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary fixed-top shadow-sm bg-slate-800 text-white">
//       <Container fluid>
//         <Navbar.Brand href="#">TaskU</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
//             <Nav.Link href="#action1">Home</Nav.Link>
//             <Nav.Link href="#action2">Link</Nav.Link>
//             <NavDropdown title="Link" id="navbarScrollingDropdown">
//               <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action4">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action5">
//                 Something else here
//               </NavDropdown.Item>
//             </NavDropdown>
//             <Nav.Link href="#" disabled>
//               Link
//             </Nav.Link>
//           </Nav>
//           <Form className="d-flex">
//             <Form.Control
//               type="search"
//               placeholder="Search"
//               className="me-2"
//               aria-label="Search"
//             />
//             <Button variant="outline-success">Search</Button>
//           </Form>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavbarComponent;