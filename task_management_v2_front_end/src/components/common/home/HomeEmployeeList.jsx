import React from 'react'
import { Space, Table, Tag, theme, Card, Flex, Button } from 'antd';
const columns = [
    
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'ID Employe',
        dataIndex: 'employe_id',
        key: 'employe_id',
    },
    {
        title: 'Contact',
        dataIndex: 'contact',
        key: 'contact',
    },    
    {
        title: 'Date arrivée',
        dataIndex: 'date_arrivee',
        key: 'date_arrivee',
    },
    {
        title: 'Poste',
        dataIndex: 'poste',
        key: 'poste',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
const data = [    
];

for (let i = 0; i < 5; i++) {
    data.push({
        key: i,
        name: `John Brown ${i}`,
        employe_id: 32,
        contact: `+225012012012- ${i}`,
        date_arrivee:`12/12/2026- ${i}`,
        poste: `Developpeur- ${i}`,
        tags: ['nice', 'developer'],
    }
);
  }

function HomeEmployeeList() {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        
            <div style={{ padding: '20px 0px 10px  0px', backgorund:colorBgContainer }}>
            <Card>
                <Flex justify='space-between' align='center' style={{ margin: '0px 0px 20px  0px', backgorund:colorBgContainer }}>
                <span>Employées</span>
                <Button> Voir plus </Button>
                </Flex>
                   

            <Table columns={columns} dataSource={data} />
            </Card>
        </div>

        
        
    )
}

export default HomeEmployeeList