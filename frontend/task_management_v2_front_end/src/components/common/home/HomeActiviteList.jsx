import { Space, Table, Tag, Card, Button, theme, Flex } from 'antd';


const columns = [
  {
    title: 'Titre',
    dataIndex: 'titre',
    key: 'titre',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Debut',
    dataIndex: 'debut',
    key: 'debut',
  },
  {
    title: 'Fin',
    dataIndex: 'fin',
    key: 'fin',
  },
  {
    title: 'Progression',
    key: 'progression',
    dataIndex: 'progression',
    render: (_, record) => {
      let color = record.progression === 'Terminé' ? 'green' : 'geekblue';
      if (record.progression === 'En suspens') {
        color = 'volcano';
      }
      return (
        <Tag color={color}>
          {record.progression}
        </Tag>
      );
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Voir </a>
        <a>Modifier </a>
        <a>Supprimer</a>
      </Space>
    ),
  },
];

const data = [];

for (let i = 0; i < 5; i++) {
  data.push({
    key: i,
    titre: `Gestion des invités ${i}`,
    debut: `20/11/2024 ${i}`,
    fin: `20/11/2024- ${i}`,
    progression: 'En suspens',
  });
}

function HomeActiviteList() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
        
    <div style={{ padding: '20px 0px 10px  0px', backgorund:colorBgContainer }}>
    <Card>
        <Flex justify="space-between" align="center" style={{ margin: '0px 0px 20px  0px', background: colorBgContainer }}>
          <span>Liste Activités</span>
          <Button> Voir plus </Button>
        </Flex>
        <Table columns={columns} dataSource={data} />
      </Card>
</div>



);
}

export default HomeActiviteList;
