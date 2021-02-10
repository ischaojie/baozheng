import React from 'react';
import DatasetSingle from "./datasetSingle";

const datasetExample = [
    {
        "id": 1,
        "name": "spam message",
        "description": "this is spam message,this is spam message,this is spam message.",
        "create_at": "2021-01-19",
        "owner": "shiniao",
        "opened": "Open",
        "count": 122121,
        "percentage": "33.33%",
    },
    {
        "id": 2,
        "name": "house rental",
        "description": "this is house rental,this is house rental,this is house rental,this is house rental.",
        "create_at": "2021-01-19",
        "owner": "chaojie",
        "opened": "Close",
        "count": 46532,
        "percentage": "90.03%",

    },
    {
        "id": 3,
        "name": "digital con",
        "description": "this is house rental,this is house rental,this is house rental,this is house rental.",
        "create_at": "2021-01-19",
        "owner": "chaojie",
        "opened": "Open",
        "count": 46532,
        "percentage": "47.66%",

    }
]

function DatasetList() {
    return (
        <div className="container mx-auto px-4 pt-12">
            <Hero/>
            <div className="flex flex-row justify-between">
                <div className="text-lg tracking-widest flex flex-wrap content-center">流行数据集</div>
                <div>
                    <form className="relative">
                        <input type="text" name="search" id="search" placeholder="search dataset"
                               className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"/>
                        <svg width="20" height="20" fill="currentColor"
                             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
                        </svg>
                    </form>

                </div>
            </div>

            <OriginList origins={datasetExample}/>

        </div>
    );
}

function OriginList(props) {
    const origins = props.origins;

    const listItems = origins.map((origin) =>
        <DatasetSingle origin={origin} key={origin.id}/>
    );
    return (
        <div className="">
            {listItems}
        </div>
    );
}

function Hero() {
    return (
        <div className="mb-12 py-6 px-12 bg-indigo-100 flex flex-row content-center">
            <div className="space-y-4 flex flex-col">
                <div>
                    baozheng：一个比较好用的数据收集和标注系统
                </div>
                <div>
                    baozheng 收集了种类繁多的机器学习数据集，同时提供对原始数据的标注服务。
                </div>
                <div>
                    <button className="rounded-md bg-indigo-600 text-white p-1 text-sm" type=" submit">导入数据集</button>
                </div>
            </div>

            <div className="">
                <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(1)" fill="none" fill-rule="evenodd">
                        <path stroke="#FFB3DA" fill="#8B34FF" fill-rule="nonzero" d="M.3.6h1542.6v57.8H.3z"/>
                        <path d="M405.6 63.1v796h1079.1c31.9 0 57.8-25.9 57.8-57.8V63.1H405.6z" fill="#F1F2F7" fill-rule="nonzero"/>
                        <path d="M.3 64.4v738.1c0 31.9 25.9 57.8 57.8 57.8H400v-796H.3v.1z" fill="#CED5E5" fill-rule="nonzero"/>
                        <path stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M1448.7 16.4h24.1v24.1h-24.1z"/>
                        <g stroke="#FFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
                            <path d="M1496.1 16.4l24.6 24.7M1520.7 16.4l-24.6 24.7"/>
                        </g>
                        <g transform="translate(590 310)" fill="#FFB3DA" fill-rule="nonzero">
                            <path d="M104.5 135.8c57.2 0 103.6 46.4 103.6 103.6v61.4H.9v-61.4c0-57.2 46.4-103.6 103.6-103.6z"/>
                            <circle cx="104.5" cy="53.8" r="53.8"/>
                        </g>
                        <path d="M1248.1 610.9H588.2c-22.5 0-40.8-18.3-40.8-40.8V258.3c0-22.5 18.3-40.8 40.8-40.8h659.9c22.5 0 40.8 18.3 40.8 40.8V570c0 22.6-18.3 40.9-40.8 40.9z" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path stroke="#CED5E5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M22.1 1181.1h309.8M736.7 1181.1h778.1"/>
                        <path fill="#FFDFD7" fill-rule="nonzero" d="M537.1 902.6l51.8 294.4 32.1-7.2-15.1-305.4zM627 492.1l28.8-45.9s7.7-2.1 5 7.7c-2.6 9.8-6.9 18-6.9 18s13.2 9.2 14.8 17.4c1.6 8.2-19.2 15-19.2 15L627 492.1z"/>
                        <path d="M507.8 602.2s85.4-58.6 118.2-111.9l25.9 13.9s-67.2 111.7-121.8 144.5L505 621.6l2.8-19.4z" fill="#5900CC" fill-rule="nonzero"/>
                        <path d="M130.1 1020.3s-53.3-42-38.6-89.6c14.7-47.6 56.1-60.1-2.6-164.4-58.7-104.3 13.9-176.9 69.5-175.7 55.6 1.1 68 99.8 43.1 151.9-24.9 52.1 51 53.3 51.6 117.9.6 64.6-32.3 95.2-42.5 159.9h-80.5z" fill="#F1F2F7" fill-rule="nonzero"/>
                        <path d="M1225.9 330.3H902.7c-6.9 0-12.6-5.6-12.6-12.6 0-6.9 5.6-12.6 12.6-12.6h323.2c6.9 0 12.6 5.6 12.6 12.6-.1 6.9-5.7 12.6-12.6 12.6zM1225.9 384.2H902.7c-6.9 0-12.6-5.6-12.6-12.6 0-6.9 5.6-12.6 12.6-12.6h323.2c6.9 0 12.6 5.6 12.6 12.6-.1 7-5.7 12.6-12.6 12.6zM1225.9 438.2H902.7c-6.9 0-12.6-5.6-12.6-12.6 0-6.9 5.6-12.6 12.6-12.6h323.2c6.9 0 12.6 5.6 12.6 12.6-.1 7-5.7 12.6-12.6 12.6zM1225.9 492.2H902.7c-6.9 0-12.6-5.6-12.6-12.6 0-6.9 5.6-12.6 12.6-12.6h323.2c6.9 0 12.6 5.6 12.6 12.6-.1 7-5.7 12.6-12.6 12.6zM1225.9 546.2H902.7c-6.9 0-12.6-5.6-12.6-12.6 0-6.9 5.6-12.6 12.6-12.6h323.2c6.9 0 12.6 5.6 12.6 12.6-.1 7-5.7 12.6-12.6 12.6z" fill="#CED5E5" fill-rule="nonzero"/>
                        <path d="M967.1 727s-2.8-8.8 4.5-15.9c7.3-7.2 13.8-13.4 27.3-20.9l33.3-11.4 14.7 27.7-79.8 20.5z" fill="#FFF" fill-rule="nonzero"/>
                        <g fill="#283444" fill-rule="nonzero">
                            <path d="M960.8 1281.4c-6.9 0-12.4-5.7-12.2-12.6l31-972.3c.2-6.6 5.6-11.8 12.2-11.8 6.9 0 12.4 5.7 12.2 12.6l-31 972.3c-.3 6.6-5.7 11.8-12.2 11.8zM1215.2 1281.4c6.9 0 12.4-5.7 12.2-12.6l-31-972.3c-.2-6.6-5.6-11.8-12.2-11.8-6.9 0-12.4 5.7-12.2 12.6l31 972.3c.2 6.6 5.6 11.8 12.2 11.8z"/>
                            <path d="M992.4 301.7h190.5v16.4H992.4zM988.8 437.6h197.7V454H988.8zM981.8 573.5h211.7v16.4H981.8zM980.5 709.4h214.3v16.4H980.5zM974.1 845.2h227.1v16.4H974.1zM970.3 981.1H1205v16.4H970.3zM965.4 1117h244.5v16.4H965.4z"/>
                        </g>
                        <path fill="#FFC933" fill-rule="nonzero" d="M606 869.7l24.4 280.4-60.8 4L524.4 880z"/>
                        <path fill="#FFDFD7" fill-rule="nonzero" d="M481.3 906.7l20.2 306.6 33.6-3.8 18.4-313.7z"/>
                        <path fill="#FFC933" fill-rule="nonzero" d="M468.5 884.7l17.4 273.3 63.6-2.8 5.2-288.1z"/>
                        <path fill="#FFC933" fill-rule="nonzero" d="M481.3 1158l72.2-3.9v16.8l-69.9 3.7z"/>
                        <path d="M498.3 1192.3l-2.6 36.5 91.7 4.8s-19.9-24.6-52.8-30.4l3.1-16.1-39.4 5.2z" fill="#283444" fill-rule="nonzero"/>
                        <path d="M485.9 610.9s-22.6 25.7-24.4 56.7c-1.8 31-3.4 217.9-3.4 217.9s139.3-4.6 153.9-19.2c0 0-47.6-152-58.5-190.2-10.9-38.2-42.1-59.1-42.1-59.1l-25.5-6.1z" fill="#5900CC" fill-rule="nonzero"/>
                        <path d="M490.6 587.6l-4.7 23.3s8.9 7.7 25.5 6.1l-4-26c0-.1-6-10.1-16.8-3.4z" fill="#FFDFD7" fill-rule="nonzero"/>
                        <path d="M505 500.8s27.9 67 14.6 84c-13.4 17.1-47.3-7.2-47.3-7.2s-49.8-27.9-43.7-61.9c6.1-34 68.4-36.5 76.4-14.9z" fill="#FFDFD7" fill-rule="nonzero"/>
                        <path fill="#FFC933" fill-rule="nonzero" d="M566.3 1153.1l66.9-4.6.6 17.1-65.5 3.4z"/>
                        <path d="M587.5 1188.8v35.6l89.3-1.6s-21-22.5-53.3-25.9l1.9-15.8-37.9 7.7zM502.4 496.5s13.5-17.9-3.7-24.8c-17.2-6.9-27.3 8.5-27.3 8.5s-7.3-12.5-22.3-6.5c-15 6.1-10.5 17.4-10.5 17.4s-12.1-5.8-19.8 6.8c-7.7 12.5-.8 22.4 6.1 24.8 0 0-14.8 7.9-3.2 25.5 9.6 14.7 27.4 37.2 61 35.8 4.6-.2.6-22-2.4-33.5-2.9-11.5-4.3-15.9-1.3-21.9 2.1-4.2 4.6-4.6 6.9-4.2 6.2 1 10.1 19.6 10.1 19.6l5.9-5.9s-10.4-23-7.5-32.8c2.3-2.8 5-5.7 8-8.8z" fill="#283444" fill-rule="nonzero"/>
                        <path fill="#5900CC" fill-rule="nonzero" d="M507.4 676.8L490 914.4h-34.4l6-246.9z"/>
                        <path d="M457.2 914.4s-6.7 42.3-4.9 51.2c1.8 8.9 7.7 18 14.4 19s16.5.1 17.1-6.6c.9-10.3.7-39 .7-39s3 26 7.1 25.6c4.3-.4 2-20.5.8-32.9-1.2-12.3-4.2-17.4-4.2-17.4h-31v.1z" fill="#FFDFD7" fill-rule="nonzero"/>
                        <path d="M507.4 676.8l-15.2 207s106.2-5 119.8-17.6M537.7 643.7s-8.5-12.2-26.3-26.7c0 0-12.1 3.4-25.5-6.1" stroke="#8B34FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path stroke="#FFBB23" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M552.1 1048.1l2.6-122.8M481.3 1158l72.2-3.9M566.3 1153.1l66.9-4.6"/>
                        <path stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M163.6 1012.5l22.9-136.7-50.2-143.5 8.5-77.7M174.1 949.7l-33.5-39.4M186.5 875.8l27.2-34.1M136.3 732.3l-29.7-29.2"/>
                        <path d="M229.6 1057.7l18.1-45.9H92.1l18.1 45.9-19.4 48.6c-7 17.5-4.9 37.3 5.5 53 8.7 13 23.3 20.9 39 20.9h69.2c15.7 0 30.3-7.8 39-20.9 10.5-15.7 12.5-35.5 5.5-53l-19.4-48.6z" fill="#FFC933" fill-rule="nonzero"/>
                        <path stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M150.1 771.5l18.9-39.2"/>
                        <circle fill="#FFF" fill-rule="nonzero" cx="634.7" cy="709.4" r="35"/>
                        <circle fill="#FFF" fill-rule="nonzero" cx="759.7" cy="709.4" r="35"/>
                        <circle fill="#FFF" fill-rule="nonzero" cx="884.7" cy="709.4" r="35"/>
                        <path fill="#FFF" fill-rule="nonzero" d="M1501.7 196h14.7v513.4h-14.7z"/>
                        <g fill="#FFF" fill-rule="nonzero">
                            <path d="M1507.2 153.1l-9.6 16.7c-.8 1.4.2 3.1 1.8 3.1h19.2c1.6 0 2.6-1.7 1.8-3.1l-9.6-16.7c-.8-1.4-2.8-1.4-3.6 0zM1510.8 752.2l9.6-16.7c.8-1.4-.2-3.1-1.8-3.1h-19.2c-1.6 0-2.6 1.7-1.8 3.1l9.6 16.7c.8 1.4 2.8 1.4 3.6 0z"/></g>
                        <path d="M873 192.1s-12.9-18-21.4-22.4c-9.8-5.1-17.1-12.6-28.7-11.7-6.4.5-.6 14.4 10.4 27.8 9.1 11 22.3 21.6 29.1 24 14.9 5.1 10.6-17.7 10.6-17.7z" fill="#FFDFD7" fill-rule="nonzero"/>
                        <path fill="#52CB96" fill-rule="nonzero" d="M1161.2 484.5l3.3 335.1h-33l-54.4-311.3 76.7-27.7z"/>
                        <path d="M1079.3 845.2s1.5-8 11.8-11.9c10.2-3.9 23.6-11.3 40.5-13.7h32.9l2.6 25.7h-87.8v-.1z" fill="#FFF" fill-rule="nonzero"/>
                        <path d="M1027.7 465.7s-107.8 72.2-119.1 91.5c-9.1 15.5 90.2 132.9 90.2 132.9l33.3-11.4-61.4-105.3s134.3-53.7 179.1-86.7l-122.1-21z" fill="#52CB96" fill-rule="nonzero"/>
                        <path d="M1064.9 155.3s-12.3 38.7-10.6 62.9c1.8 24.2 35.5 1.8 46.5-7 11.1-8.8 9.3-50.3 9.3-50.3s-15.8-27.5-45.2-5.6z" fill="#FFDFD7" fill-rule="nonzero"/>
                        <path fill="#FFDFD7" fill-rule="nonzero" d="M1083.3 220l-2.9 35.8 16 2.7 10.1-2.7-8.3-48.5z"/>
                        <path d="M1062.5 161s-7.1-10.8 10.2-22.6c17.3-11.8 48.1-6.3 66.7 18.4s21.4 13.4 43 29.2c21.6 15.8 48 42.3 30.9 66-14.4 20.1-48.3 27.7-81-.4-30-25.8-34.6-35.1-45.9-68.8-5.6-16.7-10.7-13.8-23.9-21.8z" fill="#ED85C3" fill-rule="nonzero"/>
                        <path d="M1043.9 315l-21.4 148.9s77.4 29.3 142 21.9c0 0-13-164.3-58.4-232.5 0 0-11.6 6.5-25.7.8 0-.1-22.9 27-36.5 60.9z" fill="#FFF" fill-rule="nonzero"/>
                        <path d="M1093.5 280.4s-80.6-15.4-113.7-27.2c-18.4-6.6-102.6-63.8-102.6-63.8s-15.5 7.1-15.5 27.1l84.8 68.2 117.5 49.6 23.1-27 6.4-26.9z" fill="#FFF" fill-rule="nonzero"/>
                        <path d="M970.7 573.5s80.8-32.5 138.3-61.4" stroke="#37B37F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M324.7 209.7H75.5c-8.4 0-15.3-6.8-15.3-15.3 0-8.4 6.8-15.3 15.3-15.3h249.3c8.4 0 15.3 6.8 15.3 15.3-.1 8.5-6.9 15.3-15.4 15.3zM324.7 300H75.5c-8.4 0-15.3-6.8-15.3-15.3 0-8.4 6.8-15.3 15.3-15.3h249.3c8.4 0 15.3 6.8 15.3 15.3-.1 8.5-6.9 15.3-15.4 15.3zM324.7 390.2H75.5c-8.4 0-15.3-6.8-15.3-15.3 0-8.4 6.8-15.3 15.3-15.3h249.3c8.4 0 15.3 6.8 15.3 15.3-.1 8.5-6.9 15.3-15.4 15.3z" fill="#FFF" fill-rule="nonzero"/>
                        <path stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M842.1 217.5v393.4"/>
                        <path d="M1120.8 280.8l39.2 73.1s2.4-33.7 12-66.1c0 0 2.2 2.5 9.2 4.2 7 1.7 12.3.9 12.3.9s.4 85.8-10.6 106.3c-3.4 6.4-18.4 1.9-30.4-3-8.8-3.6-16.1-7.5-16.1-7.5l-15.1-104-.5-3.9z" fill="#FFF" fill-rule="nonzero"/>
                        <path d="M1152.5 396.2c-3.7-20.6-4.7-22.2-7.6-34.9" stroke="#F1F2F7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1172.4 288.4s-.7-5.8 4.6-7.5c5.3-1.7 21.6.6 22.6 6.2 1 5.6-3.1 7.3-4.2 5.2-1.1-2.1-2.8.7-2.8.7s-15 4.1-20.2-4.6z" fill="#FFDFD7" fill-rule="nonzero"/></g>
                </svg>
            </div>
        </div>
    );
}

export default DatasetList