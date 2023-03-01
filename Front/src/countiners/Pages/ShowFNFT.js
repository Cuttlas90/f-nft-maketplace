//------------------- this page show FNFT by address and tokenId ---------------------
//------------ if user not conected wallet can see buy btn ,... ------------
//--if user has conected wallet and owner of FNFT Token that show can sell and...--
//this page shwoing all listings of FNFT tekens List in this marketplace and showing chart of price

import { useParams } from "react-router"
import "../../Styles/showFNFT.css"
import Chart from "../../components/Chart";
import { useEffect, useState } from "react";
import NFTs from '../../constance/NFTs.json'
export default function ShowFNFT() {
    const { tokenId, address, chain } = useParams();
    const [showNFT, setShowNFT] = useState({});
    const [chartData, setChartData] = useState("");
    const [buyMode, setBuyMode] = useState(true);
    const [amount, setAmount] = useState(1);
    const [price, setPrice] = useState(1);

    useEffect(() => {
        var finded = NFTs.list.find((item) => item.address === address && item.tokenId === tokenId && item.chain === chain);
        if (!showNFT.NFT) {
            console.log('if')
            setShowNFT({ NFT: finded })
        }
    }, [showNFT, NFTs, setShowNFT]);
    console.log('update');
    const buyNFT = () => {
        console.log('action buy NFT')
    }
    const isOwner = false;
    const sellerList = () => {
        var sellLists = []
        for (let i = 0; i < 20; i++) {
            sellLists.push({
                price: (Math.random() * (18 - 15) + 15).toFixed(2),
                seller: "0x25895457487523gftftsd6544564ddvcdfv",
                buyer: "0x25895457487523gftftsd6544564ddvcdfv",
                amonts: (Math.random() * (5 - 1) + 1).toFixed(0),
                listingId: i
            })
        }
        sellLists.sort((a, b) => (a.price > b.price ? 1 : -1))
        return (sellLists)
    }
    const buyerList = () => {
        var sellLists = []
        for (let i = 0; i < 20; i++) {
            sellLists.push({
                price: (Math.random() * (14.9 - 13) + 13).toFixed(2),
                seller: "0x25895457487523gftftsd6544564ddvcdfv",
                buyer: "0x25895457487523gftftsd6544564ddvcdfv",
                amonts: (Math.random() * (5 - 1) + 1).toFixed(0),
                listingId: i
            })
        }
        sellLists.sort((a, b) => (a.price < b.price ? 1 : -1))
        return (sellLists)
    }
    const listings = [
        {
            price: "1.5",
            seller: "0x25895457487523gftftsd6544564ddvcdfv",
            state: "1",
            buyer: "0x25895457487523gftftsd6544564ddvcdfv",
            listingId: "0"
        },
        {
            price: "2",
            seller: "0x25895457487523gftftsd6544564ddvcdfv",
            state: "2",
            buyer: "0x0000000000000000000000000000000000000000",
            listingId: "1"
        },
        {
            price: "3",
            seller: "0x25895457487523gftftsd6544564ddvcdfv",
            state: "2",
            buyer: "0x0000000000000000000000000000000000000000",
            listingId: "2"
        },
        {
            price: "4",
            seller: "0x25895457487523gftftsd6544564ddvcdfv",
            state: "0",
            buyer: "0x0000000000000000000000000000000000000000",
            listingId: "3"
        },
        {
            price: "5",
            seller: "0x25895457487523gftftsd6544564ddvcdfv",
            state: "2",
            buyer: "0x1524854fgrgterg964564hr6yhg5151g5g",
            listingId: "4"
        },
    ]
    useEffect(() => {
        const showChart = () => {
            var label = "Price in:" + showNFT.NFT.chain;
            var labels = [];
            var data = [];
            var sorted = JSON.parse(JSON.stringify(listings)).sort((a, b) => (a.listingId > b.listingId ? 1 : -1));
            sorted.map((row, index) => {
                labels.push(index);
                data.push(row.price)
            })
            var DataList = {
                labels: labels,
                datasets: [
                    {
                        label: label,
                        data: data,
                        backgroundColor: [
                            "#ffbb11",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0"
                        ]
                    }
                ]
            };
            setChartData(DataList);
        }
        if (showNFT.NFT && !chartData) showChart();
    }, [showNFT.NFT, chartData])
    return (
        <>
            {showNFT.NFT &&
                <div className="showNFT_continer">
                    <div className="row align-items-start">
                        <div className="col-md-5">
                            <div className="cardNFT">
                                <div >
                                    <span><img src={window.location.origin + "/Images/unitIcon/" + showNFT.NFT.chain + ".png"} alt="" /></span>
                                    <div className="like">
                                        <input type="checkbox" />
                                        <i className="fa-regular fa-heart"></i>
                                    </div>
                                </div>
                                <img src={showNFT.NFT.image} className="w-100" alt="" />
                            </div>
                            <div className="tagItem">
                                <div className="tagHead">
                                    <div className="d-flex align-items-center"><span className="icon">subject</span><h6>Description</h6></div>
                                    <span className="icon" data-bs-toggle="collapse" data-bs-target="#tagMore4">expand_more</span>
                                </div>
                                <div id="tagMore4" className="tagMore collapse show">
                                    <p>Created By <a href="">{showNFT.NFT.owner}</a></p>
                                    <p>{showNFT.NFT.metadata.description}</p>
                                </div>
                            </div>
                            <div className="tagItem">
                                <div className="tagHead">
                                    <div className="d-flex align-items-center"><span className="icon">label_important</span><h6>Properties</h6></div>
                                    <span className="icon" data-bs-toggle="collapse" data-bs-target="#tagMore5">expand_more</span>
                                </div>
                                <div id="tagMore5" className="tagMore collapse">
                                    <div className='row'>
                                        {showNFT.NFT.metadata.attributes.map((row, index) =>
                                            (row.trait_type !== "" && !row.value2) &&
                                            <div className='col-sm-3 ProOpt' key={index}>
                                                <div>{row.trait_type}</div>
                                                <div>{row.value}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="tagItem">
                                <div className="tagHead">
                                    <div className="d-flex align-items-center"><span className="icon">star_rate</span><h6>Levels</h6></div>
                                    <span className="icon" data-bs-toggle="collapse" data-bs-target="#tagMore6">expand_more</span>
                                </div>
                                <div id="tagMore6" className="tagMore collapse">
                                    <div className='row '>
                                        {showNFT.NFT.metadata.attributes.map((row, index) =>
                                            (row.trait_type !== "" && row.value2) &&
                                            <div className=' col-sm-6 p-2' key={index}>
                                                <div className='levelOpt'>
                                                    <div className='d-flex justify-content-between'>
                                                        <span>{row.trait_type}</span>
                                                        <span>{row.value} of {row.value2}</span>
                                                    </div>
                                                    <div className='w-100'>
                                                        <progress className='w-100' value={(row.value / row.value2) * 100} max="100"></progress>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="tagItem">
                                <div className="tagHead">
                                    <div className="d-flex align-items-center"><span className="icon">receipt_long</span><h6>Details</h6></div>
                                    <span className="icon" data-bs-toggle="collapse" data-bs-target="#tagMore8">expand_more</span>
                                </div>
                                <div id="tagMore8" className="tagMore collapse show">
                                    <div className="d-flex align-items-center justify-content-between py-2">
                                        <span>Contract Address</span>
                                        <a href={"/ShowNFT/" + showNFT.NFT.chain + "/" + showNFT.NFT.address + "/" + showNFT.NFT.tokenId}>{showNFT.NFT.address.substring(0, 4)}...{showNFT.NFT.address.substring(showNFT.NFT.address.length - 4, showNFT.NFT.address.length)}</a>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between py-2">
                                        <span>Token ID</span>
                                        <a href={showNFT.NFT.url}>{showNFT.NFT.tokenId}</a>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between py-2">
                                        <span>Token Standard</span>
                                        {showNFT.NFT.isErc721 ? <span>Erc721 Tokens</span> : <span>Erc1155 Tokens</span>}
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between py-2">
                                        <span>Blockchain</span>
                                        <span href="">{showNFT.NFT.chain}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mainNft col-md-7">
                            <div className="d-flex justify-content-between w-100 py-2">
                                <span className="d-flex align-items-center headcollect">{showNFT.NFT.metadata.name}<span className="icon ps-1 font-size-large text-primary">verified</span></span>
                                <div className="tools">
                                    <span className="icon">replay</span>
                                    <span className="icon">open_in_new</span>
                                    <span className="icon">share</span>
                                    <span className="icon">more_vert</span>
                                </div>
                            </div>
                            <h1>#{showNFT.NFT.tokenId}</h1>
                            <div className="ovf">
                                <span className="">Owned by <a href="#">{showNFT.owner}</a></span>
                                <span className="d-flex align-items-center"><span className="icon ps-2 pe-1">visibility</span>views</span>
                                <span className="d-flex align-items-center"><span className="icon ps-2 pe-1">favorite</span>views</span>
                            </div>
                            <div className="sellInfo">
                                <div className="d-flex align-items-center justify-content-between p-3">
                                    <h6 className="d-flex align-items-center m-0"><span className="icon pe-2">schedule</span> auctions features add in next Update  </h6>
                                    <span className="icon">info</span>
                                </div>
                                <div className="price">
                                    <p>Current price</p>
                                    <div className="buy">
                                        <span>1.5<small>{showNFT.NFT.chain}</small></span>
                                        <img src={window.location.origin + "/Images/unitIcon/" + showNFT.NFT.chain + ".png"} alt="" />{showNFT.price}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button onClick={() => buyNFT()} className="btn btn-primary d-flex align-items-center me-2"><span className="icon me-2">account_balance_wallet</span>Buy now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tagItem">
                                <div className="tagHead">
                                    <div className="d-flex align-items-center"><span className="icon">insights</span><h6>Price History</h6></div>
                                    <span className="icon" data-bs-toggle="collapse" data-bs-target="#tagMore1">expand_more</span>
                                </div>
                                <div id="tagMore1" className="tagMore collapse show">
                                    <div>
                                        <select className="chartTime col-sm-6">
                                            <option value="All">All time</option>
                                            <option value="7Week">Last week</option>
                                            <option value="1Month">Last month</option>
                                            <option value="3Month">Last 3 months</option>
                                            <option value="1Year">Last year</option>
                                        </select>
                                    </div>
                                    <Chart data={chartData}
                                        options={{
                                            plugins: {
                                                title: {
                                                    display: true,
                                                    text: " Char Prices"
                                                },
                                                legend: {
                                                    display: true,
                                                    position: "bottom"
                                                }
                                            },
                                            animations: {
                                                radius: {
                                                    duration: 1000,
                                                    easing: 'linear',
                                                    from: 5,
                                                    to: 0,
                                                    loop: true
                                                },
                                                y: {
                                                    easing: 'easeInOutElastic',
                                                    dropped: true
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="tagItem">
                                <div className="tagHead">
                                    <div className="d-flex align-items-center"><span className="icon">storefront</span><h6>Live Fractional Market</h6></div>
                                    <span className="icon" data-bs-toggle="collapse" data-bs-target="#tagMore2">expand_more</span>
                                </div>
                                <div id="tagMore2" className="tagMore collapse show">
                                    <div className="row">
                                        <div className="LiveMarket col-sm-6 px-4">
                                            <h5 className="text-center text-success bg-light">Buyers Price</h5>
                                            <table className="w-100">
                                                <thead>
                                                    <tr className=" bg-success text-light">
                                                        <th colSpan={3} className="text-center">Amount</th>
                                                        <th colSpan={1} className="text-center">Price   </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {buyerList().map((row, index) =>
                                                        <tr key={index} className={index % 2 === 0 ? "bglowGreen" : "txlowGreen"}>
                                                            <td colSpan={3} className="text-center">{row.amonts}<small className="ms-2">Tokens</small></td>
                                                            <td colSpan={1} className="text-center">{row.price}<small className="ms-2">Flow</small></td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="LiveMarket col-sm-6 px-4">
                                            <h5 className="text-center text-danger bg-light">Seller Price</h5>
                                            <table className="w-100">
                                                <thead>
                                                    <tr className="bg-danger text-light">
                                                        <th colSpan={3} className="text-center">Amount</th>
                                                        <th colSpan={1} className="text-center">Price   </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sellerList().map((row, index) =>
                                                        <tr key={index} className={index % 2 === 0 ? "bglowRed" : "txlowRed"}>
                                                            <td colSpan={3} className="text-center">{row.amonts}<small className="ms-2">Tokens</small></td>
                                                            <td colSpan={1} className="text-center">{row.price}<small className="ms-2">Flow</small></td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="">
                                            <div className='tabDiv'>
                                                <div className='tabItem'>
                                                    <input type="radio" name='express' checked={buyMode} onChange={() => setBuyMode(true)} />
                                                    <div>
                                                        <h3>BUY</h3>
                                                        <span></span>
                                                    </div>
                                                </div>
                                                <div className='tabItem'>
                                                    <input type="radio" name='express' checked={!buyMode} onChange={() => setBuyMode(false)} />
                                                    <div>
                                                        <h3>SELL</h3>
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="orderToken">
                                                <div className="row pb-3">
                                                    <div className="orderInput col-sm-6 ">
                                                        <div className="py-1">
                                                            <label className="d-block">Amount:</label>
                                                            <input value={amount} onChange={(e) => setAmount(e.target.value)} type='number' min={1} step={1} />
                                                            <small className="ms-2">Tokens</small>
                                                        </div>
                                                        <div className="py-1">
                                                            <label className="d-block">Price:</label>
                                                            <input value={price} onChange={(e) => setPrice(e.target.value)} type='number' min={0.01} step={0.01} />
                                                            <img className="ms-2 me-1" style={{ width: "15px" }} src="/Images/uniticon/Flow.png" alt="flow" />
                                                            <small>Flow</small>
                                                        </div>
                                                    </div>
                                                    <div className=" col-sm-6 mt-3">
                                                        {buyMode
                                                            ? <>
                                                                <h5 className="text-center">you are Paying</h5>
                                                                <strong className="fs-4 text-center d-block">{amount * price}<small className="fs-6 ms-1">Flow</small></strong>
                                                                <small className="d-block text-center fs-6">+network fee</small>
                                                            </>
                                                            : <>
                                                                <h5 className="text-center">you are reciving</h5>
                                                                <strong className="fs-4 text-center d-block">{amount * price}<small className="fs-6 ms-1">Flow</small></strong>
                                                                <small className="d-block text-center fs-6">-network fee</small>
                                                            </>}
                                                    </div>
                                                </div>
                                                <div className="pt-3 orderAction">
                                                    {buyMode
                                                        ? <button className="btn btn-success mx-auto d-block px-4">Buy Token</button>
                                                        : <button className="btn btn-danger mx-auto d-block px-4">Sell Token</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="activity row"></div>
                    <div className="morInCollection row"></div>
                </div>
            }
        </>
    )
}