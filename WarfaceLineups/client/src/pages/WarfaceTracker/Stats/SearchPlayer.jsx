import React, {useState} from 'react';
import StatsAPI from "../../../http/api/wftracker/StatsAPI";

const SearchPlayer = () => {

    const handleClickSearchPlayer = (value) =>{
        StatsAPI.getStatsPlayer(value.nickname).then(data=>{
            setDataSource(data);
            setIsVisibleStatsPlayer(true);
        })
    }
    const [isVisibleStatsPlayer,setIsVisibleStatsPlayer] = useState(false);
    const [dataSource,setDataSource] = useState( []);
    return (
        <div>
            <h3>В разработке</h3>
            {/*<Card>
                {!isVisibleStatsPlayer ?
                    <Space direction={'vertical'}>
                        <Form
                            layout={"vertical"}
                            name="basic"
                            onFinish={handleClickSearchPlayer}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Введите никнейм игрока"
                                name="nickname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста введите никнейм',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Найти</Button>
                            </Form.Item>
                        </Form>
                        <Space>

                        </Space>
                    </Space>
                    :
                    <Player data={dataSource}/>
                }
            </Card>*/}
        </div>
    );
};

export default SearchPlayer;