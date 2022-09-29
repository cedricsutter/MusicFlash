import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container } from 'reactstrap';
import PageProps from '../interfaces/page';

const HomePage: React.FC<PageProps> = ({ name }) => {
    return (
        <Container>
            <Card>
                <CardBody>
                    <p>
                        Welcome!
                    </p>
                    <p>
                        Change your password <Link to="/change">here</Link>.
                    </p>
                    <p>
                        Click <Link to='/logout'>here</Link> to logout.
                    </p>
                </CardBody>
            </Card>
        </Container>
    );
}

export default HomePage;