import React from 'react'
import { Button, Result } from 'antd';

const NoPage = () => {
  return (
    <Result
    status="404"
    title="404"
    subTitle="Désolé, cette page n'existe pas."
    extra={<Button type="primary">Retour</Button>}
  />
  )
}

export default NoPage