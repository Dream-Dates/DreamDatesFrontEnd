// Header.js
import redHeart from '../assets/redHeart.svg';
import magnifyingGlass from '../assets/magnifyingGlass.svg';
import { Container, Row, Col, Input, Button } from 'reactstrap';



function Header2() {
    return (
        <Container>
            <Row>
                <Col className="bg-light border" xs='3'>DreamDates</Col>
                <Col className="bg-light border" xs='6'>
                    <Input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search for movies, restaurants, active"
                    />
                </Col>
                <Col className="bg-light border" xs='3'>
                    <Row>
                        <Col className="bg-light border" ><Button className='pinkButton'>Saved</Button></Col>
                        <Col className="bg-light border"><Button className='pinkButton'>Sign In</Button></Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className="bg-light border"  sm={{offset: 3, size:6}}>
                    <Row>
                        <Col className="bg-light border"><Button className='pinkButton'>Food</Button></Col>
                        <Col className="bg-light border"><Button className='pinkButton'>Movies</Button></Col>
                        <Col className="bg-light border"><Button className='pinkButton'>Active</Button></Col>
                        <Col className="bg-light border"><Button className='pinkButton'>Attractions</Button></Col>
                        <Col className="bg-light border"><Button className='pinkButton'>Live Entertainment</Button></Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Header2