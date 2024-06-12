import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges || [];
  // Note: To access this endpoint you need premium plan

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
      {exchangesList.map((exchange) => (
  <Col span={24} key={exchange.uuid}> {/* Unique key */}
    <Collapse>
      <Panel
        key={exchange.uuid}
        showArrow={false}
        header={(
          <Row key={exchange.uuid}>
            <Col span={6}>
              <Text><strong>{exchange.rank}.</strong></Text>
              <Avatar className="exchange-image" src={exchange.iconUrl} />
              <Text><strong>{exchange.name}</strong></Text>
            </Col>
            <Col span={6}>${millify(exchange.volume)}</Col>
            <Col span={6}>{millify(exchange.price)}</Col>
            <Col span={6}>{millify(exchange.marketShare)}%</Col>
          </Row>
        )}
      >
        {exchange.description ? HTMLReactParser(exchange.description) : 'No description available'} {/* Check if description exists */}
      </Panel>
    </Collapse>
  </Col>
))}

      </Row>
    </>
  );
};

export default Exchanges;