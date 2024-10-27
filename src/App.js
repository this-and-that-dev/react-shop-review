import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, Image, Card, Button, Col, Row} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";

function App() {

    let [goodsList, setGoodsList] = useState([]);
    let [pageIdx, setPageIdx] = useState(2);
    let [welcomeText, setWelcomeText] = useState("");

    useEffect(() => {
        axios.get(`https://codingapple1.github.io/shop/data${pageIdx}.json`)
            .then(result => {
                let newGoodsList = [...goodsList];
                setGoodsList(newGoodsList.concat(result.data));
            })
            .catch(error => {
                console.log(error);
            });
    }, [pageIdx]);

    useEffect(() => {
        axios.get("https://codingapple1.github.io/userdata.json")
            .then(({data}) => {
                setWelcomeText(data.name + " hi!");
            })
    }, []);

//https://codingapple1.github.io/shop/data1.json
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">아트박스</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">{welcomeText}</Nav.Link>
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">상품상세</Nav.Link>
                        <Nav.Link href="#pricing">장바구니</Nav.Link>
                        <Nav.Link href="#pricing">새로고침</Nav.Link>
                        <Nav.Link href="#pricing">두번 뒤로가기</Nav.Link>
                        <Nav.Link href="#pricing">뒤로가기</Nav.Link>
                        <Nav.Link href="#pricing">앞으로가기</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Image src="/universe.jpeg" fluid/>
            <Row xs={3} md={3} className="g-4">
                {
                    goodsList.map((goods, idx) => {
                        return (
                            <Col key={goods.id}>
                                <Card>
                                    <Card.Img variant="top"
                                              src={'https://codingapple1.github.io/shop/shoes' + (idx + 1) + '.jpg'}/>
                                    <Card.Body>
                                        <Card.Title>{goods.title}</Card.Title>
                                        <Card.Text>{goods.content}</Card.Text>
                                        <Card.Text>{goods.price}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
            {
                pageIdx < 3 &&
                <div style={{textAlign: "center", padding: "10px"}}>
                    <Button onClick={() => {
                        setPageIdx(pageIdx + 1);
                    }}>더보기</Button>
                </div>
            }

        </div>
    );
}

export default App;
