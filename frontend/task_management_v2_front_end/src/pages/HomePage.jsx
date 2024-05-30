import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card, Row, Col, List, Avatar, Statistic, Progress } from 'antd';
import axios from 'axios';
import AppURL from '../api/AppURL';

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchNotifications();
    fetchRecentActivity();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(AppURL.TaskList);
      setTasks(response.data.tasks);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchNotifications = async () => {
    try {
      /* const response = await axios.get(AppURL.Notifications);
       setNotifications(response.data.notifications);*/
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      /*const response = await axios.get(AppURL.RecentActivity);
      setRecentActivity(response.data.activity);*/
    } catch (error) {
      setError(error.message);
    }
  };

  // Calculate task progress
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const taskProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: '0 0 10px 0' }}>
        <Row gutter={16}>
          <Col span={8}>
          <Card title="Tasks" >
          <div className="scrollable-card-body" style={{ maxHeight: 300, overflowY: 'auto', padding:'0px', margin:'0px' }}>
                <List
                  dataSource={tasks}
                  renderItem={task => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={task.avatar} />}
                        title={<a href="#">{task.title}</a>}
                        description={task.description}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Notifications">
              <List
                dataSource={notifications}
                renderItem={notification => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={notification.avatar} />}
                      title={<a href="#">{notification.title}</a>}
                      description={notification.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Recent Activity">
              <List
                dataSource={recentActivity}
                renderItem={activity => (
                  <List.Item>
                    <List.Item.Meta
                      title={<a href="#">{activity.title}</a>}
                      description={activity.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ padding: '10px 0 10px 0' }}>
          <Col span={8}>
            <Card>
              <Statistic title="Total Tasks" value={tasks.length} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Unfinished Tasks" value={tasks.filter(task => task.status !== 'completed').length} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Notifications" value={notifications.length} />
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Card title="Task Progress">
              <Progress percent={taskProgress} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
