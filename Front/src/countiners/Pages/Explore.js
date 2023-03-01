//---------- this page showing all NFT in Marketplace in all chain(CELO,ETH,MATIC)-----------
//-- FILTER section for search NFTs name,prop,... need a backend and complet in nex update --

import { useEffect, useState } from "react";
import '../../Styles/explore.css'
import category from '../../constance/category.json'
import { useDispatch, useSelector } from "react-redux";
import { selectExplore, likeNFT, getAllNFTMarketPlace, selectAllNFT, exploreAllNFT } from "../../features/NFT/NFTSlice";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import nfts from '../../constance/NFTs.json'

export default function Explore(props) {
  const marketNFTs = useSelector(selectExplore);
  const collection = props.collection;
  const [NFTs, setNFTs] = useState({ listNFTs: [] })
  const dispatch = useDispatch();
  const [categ, setCateg] = useState("");
  const allNFTs = useSelector(selectAllNFT);
  const [page, setPage] = useState(1);
  // this useEfect for useing this page in other page by props and handel it
  // useEffect(() => {
  //   if (props.collection) {
  //     setNFTs(collection);
  //   } else {
  //     if (allNFTs.reFormed ==="") {
  //       dispatch(getAllNFTMarketPlace())
  //     } else {
  //       if (marketNFTs.Status === "") dispatch(exploreAllNFT(1))
  //       if (marketNFTs.Status === "idle") { setNFTs(marketNFTs);}
  //     }
  //   }
  // }, [allNFTs.reFormed, collection, marketNFTs]);

  //  only for hard code
  useEffect(() => {
    if (NFTs.listNFTs.length < 1) {
      setNFTs({ listNFTs: nfts.list, name: 'samle Colection' })
    }
  }, [NFTs, nfts])
  console.log(NFTs.listNFTs)

  // for mor load NFT in market place by scoroll recive end of page
  const handelScroll = (e) => {
    if (!props.collection) {
      var scrollTop = e.target.scrollTop;
      var scrollHeight = e.target.scrollHeight;
      var offsetHeight = e.target.offsetHeight;
      var contentHeight = scrollHeight - offsetHeight;
      if (contentHeight <= scrollTop) {
        dispatch(exploreAllNFT(page + 1));
        setPage(page + 1);
      }
    }
  }
  return (
    <>
      <div className="exploreCountiner">
        <div id="filterIcon" className="collapse icon" data-bs-toggle="collapse" data-bs-target="#filter , #filterIcon">filter_list</div>
        <div id="filter" className="filter collapse show">
          <div className="filterHead">
            <h6><span className="icon">filter_list</span> Filter</h6>
            <span className="icon" data-bs-toggle="collapse" data-bs-target="#filter , #filterIcon">arrow_back</span>
          </div>
          <div className="filterItem">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <h6>Status</h6>
              <span className="icon" data-bs-toggle="collapse" data-bs-target="#filter1">expand_more</span>
            </div>
            <div id="filter1" className="showMore collapse show">
              <div className="itemWithcheck">
                <input type="checkbox" />
                <span>Buy now</span>
              </div>
              <div className="itemWithcheck">
                <input type="checkbox" />
                <span>On Auction</span>
              </div>
              <div className="itemWithcheck">
                <input type="checkbox" />
                <span>New</span>
              </div>
              <div className="itemWithcheck">
                <input type="checkbox" />
                <span>Has Offer</span>
              </div>
            </div>
          </div>
          <div className="filterItem">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <h6>Price</h6>
              <span className="icon" data-bs-toggle="collapse" data-bs-target="#filter2">expand_more</span>
            </div>
            <div id="filter2" className="showMore collapse show">
              <div className="d-flex flex-wrap justify-content-between w-100">
                <div className="itemWithRadio">
                  <input type="radio" name="PriceUnit" />
                  <span className="d-flex align-items-center justify-content-center">$ USD</span>
                </div>
                <div className="itemWithRadio">
                  <input type="radio" name="PriceUnit" />
                  <span><img style={{ width: '25px' }} className="unit" src={window.location.origin + "/Images/unitIcon/Flow.png"} alt="" /> Flow</span>
                </div>
              </div>
              <div className="PriceMinMax">
                <input type="number" min="0" placeholder="min" /> of <input type="number" min="1" placeholder="max" />
              </div>
            </div>
          </div>
          <div className="filterItem">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <h6>Categories</h6>
              <span className="icon" data-bs-toggle="collapse" data-bs-target="#filter3">expand_more</span>
            </div>
            <div id="filter3" className="showMore collapse">
              <div className='row'>
                {category.list.map((row, index) =>
                  <div key={index} className='col-sm-12 p-2 position-relative'>
                    <input name='category' type='radio' onChange={(e) => { e.target.checked === true && setCateg(row.Name) }} />
                    <div className='filterCategory'>
                      <span>
                        <img src={window.location.origin + row.image} alt='' />
                      </span>
                      <div>{row.Name}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="filterItem">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <h6>Chains</h6>
              <span className="icon" data-bs-toggle="collapse" data-bs-target="#filter4">expand_more</span>
            </div>
            <div id="filter4" className="showMore collapse">
              <div className="d-flex flex-wrap justify-content-between w-100">
                <div style={{ width: "90%" }} className="itemWithRadio">
                  <input type="radio" name="Chains" />
                  <span><img style={{ width: "25px" }} className="unit me-2" src={window.location.origin + "/Images/unitIcon/Flow.png"} alt="" />Flow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cardCountiner" onScroll={(e) => handelScroll(e)}>
          {NFTs.listNFTs.map((row, index) =>
            <div key={index} className="col-md-6 col-lg-4 px-2 py-2 ">
              <div className="cardExplore">
                <div className="imageCard">
                  {row.isFractional
                    ? <Link to={"/ShowFNFT/" + row.chain + "/" + (row.contractAddress || row.address) + "/" + row.tokenId}>
                      {row.image && <img src={row.image} alt="" />}
                    </Link>
                    : <Link to={"/ShowNFT/" + row.chain + "/" + (row.contractAddress || row.address) + "/" + row.tokenId}>
                      {row.image && <img src={row.image} alt="" />}
                    </Link>
                  }
                </div>
                <div className="cardDetailse">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{NFTs.name}</span>
                    <span>Price</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6>{row.name}#{row.tokenId}</h6>
                    <h6><img src={window.location.origin + "Images/unitIcon/" + row.chain + ".png"} alt="" />{row.price}</h6>
                  </div>
                </div>
                <div className="cardBottom">
                  <input type="checkbox" onChange={(e) => dispatch(likeNFT())} />
                  {row.price && <Link to={"/ShowNFT/" + row.chain + "/" + row.address + "/" + row.tokenId}>Buy now</Link>}
                  <span>{row.like} <i className="fa-regular fa-heart"></i></span>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* } */}
      </div>
    </>
  )
}