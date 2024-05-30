import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

function HomeCard() {

    return (

        <div style={{ padding: '10  10' }}>

            <Row gutter={16}>
                <Col span={6}>
                    <Link to="/">
                        <Card title="Total Employés" bordered={false}>
                            <span>50</span>
                        </Card>
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to="/">
                        <Card title="Nouveaux Employés" bordered={false}>
                            <span>50</span>
                        </Card>
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to="/">
                        <Card title="Congés" bordered={false}>
                            <span>50</span>
                        </Card>
                    </Link>

                </Col>
                <Col span={6}>
                    <Link to="/">
                        <Card title="Actvités" bordered={false}>
                            <span>50</span>
                        </Card>
                    </Link>

                </Col>
            </Row>

        </div>

    )
}

export default HomeCard