/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


import { connect } from '../../../../src/echarts.all';
import { createChart } from '../../core/utHelper';
import { EChartsType } from '../../../../src/echarts';


describe('api/getConnectedDataURL', function () {
    const data1: number[][] = [];

    const symbolCount = 6;

    for (let i = 0; i < 100; i++) {
        data1.push([
            Math.random() * 5,
            Math.random() * 4,
            Math.random() * 20,
            Math.round(Math.random() * (symbolCount - 1)),
        ]);
    }

    describe('svg', function () {
        let chart0: EChartsType;
        let chart1: EChartsType;
        beforeEach(function () {
            chart0 = createChart({ opts: { renderer: 'svg' } });
            chart1 = createChart({ opts: { renderer: 'svg' } });
        });

        afterEach(function () {
            chart0.dispose();
            chart1.dispose();
        });

        it('should return connected data url', function () {
            chart0.setOption({
                backgroundColor: 'red',
                toolbox: {
                    feature: {
                        saveAsImage: {
                            show: true,
                            title: 'Save as image',
                            type: 'svg',
                            connectedBackgroundColor: 'yellow',
                        },
                        dataZoom: {
                            yAxisIndex: 'none',
                            show: true,
                            title: {
                                zoom: 'Zoom in',
                                back: 'Zoom out',
                            },
                        },
                    },
                    show: true,
                    itemGap: 1,
                    top: 20,
                    right: 35,
                },
                legend: {
                    top: 50,
                    data: ['scatter'],
                },
                tooltip: {
                    formatter: '{c}',
                },
                grid: {
                    top: '26%',
                    bottom: '26%',
                },
                xAxis: {
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                },
                series: [{
                    name: 'scatter',
                    type: 'scatter',
                    symbolSize: 30,
                    data: data1,
                }],
            });
            chart0.setOption({
                backgroundColor: 'green',
                legend: {
                    top: 50,
                    data: ['scatter'],
                },
                tooltip: {
                    formatter: '{c}',
                },
                grid: {
                    top: '26%',
                    bottom: '26%',
                },
                xAxis: {
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                },
                series: [{
                    name: 'scatter',
                    type: 'scatter',
                    symbolSize: 30,
                    data: data1,
                }],
            });

            connect([chart0, chart1]);

            const result = chart0.getConnectedDataURL({ type: 'svg', backgroundColor: 'pink' });

            expect(result).toBeDefined();
        });

    });


    describe('canvas', function () {
        let chart0: EChartsType;
        let chart1: EChartsType;
        beforeEach(function () {
            chart0 = createChart({ opts: { renderer: 'canvas' } });
            chart1 = createChart({ opts: { renderer: 'canvas' } });
        });

        afterEach(function () {
            chart0.dispose();
            chart1.dispose();
        });

        it('should return connected data url', function () {
            chart0.setOption({
                backgroundColor: 'red',
                toolbox: {
                    feature: {
                        saveAsImage: {
                            show: true,
                            title: 'Save as image',
                            type: 'png',
                            connectedBackgroundColor: 'yellow',
                        },
                        dataZoom: {
                            yAxisIndex: 'none',
                            show: true,
                            title: {
                                zoom: 'Zoom in',
                                back: 'Zoom out',
                            },
                        },
                    },
                    show: true,
                    itemGap: 1,
                    top: 20,
                    right: 35,
                },
                legend: {
                    top: 50,
                    data: ['scatter'],
                },
                tooltip: {
                    formatter: '{c}',
                },
                grid: {
                    top: '26%',
                    bottom: '26%',
                },
                xAxis: {
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                },
                series: [{
                    name: 'scatter',
                    type: 'scatter',
                    symbolSize: 30,
                    data: [
                        [10, 7],
                        {
                            value: [333, 9999],
                            itemStyle: {
                                color: 'red',
                            },
                        },
                    ],
                }],
            });
            chart0.setOption({
                backgroundColor: 'green',
                legend: {
                    top: 50,
                    data: ['scatter'],
                },
                tooltip: {
                    formatter: '{c}',
                },
                grid: {
                    top: '26%',
                    bottom: '26%',
                },
                xAxis: {
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                },
                series: [{
                    name: 'scatter',
                    type: 'scatter',
                    symbolSize: 30,
                    data: [
                        [10, 7],
                        {
                            value: [333, 9999],
                            itemStyle: {
                                color: 'red',
                            },
                        },
                    ],
                }],
            });

            connect([chart0, chart1]);

            const result = chart1.getConnectedDataURL({ type: 'png', backgroundColor: 'pink' });

            expect(result).toBeDefined();
            expect(result).toContain('data:image/png;base64,');
        });
    });
});
