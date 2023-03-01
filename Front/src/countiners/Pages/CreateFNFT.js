import { useState } from 'react'
import '../../Styles/FNFT.css'
export default function CreateFNFT() {

    const [address, setAddress] = useState("")
    const [numberShares, setNumberShares] = useState(1)
    const [priceShares, setPriceShares] = useState(1)
    return (
        <div className="FNFT">
            <h1>Create New  Fractional NFT</h1>
            <form id="CreateForm" className="creatForm">
                <p className="detaileForm">
                    <i >*</i> Required fields
                </p>
                <div className='row align-items-center justify-content-between'>
                    <div className="formSection col-sm-12">
                        <label className="lable">
                            NFT Address:<i>*</i>
                        </label>
                        <input value={address} onChange={(e) => setAddress(e.target.value)} autoCapitalize="off" autoComplete="off" autoCorrect="off" className="formInput" data-testid="Input" id="addressF-NFT" name="name" placeholder="Address of NFT..." required="required" spellCheck="false" type="text" />
                    </div>
                    <div className="formSection col-sm-5">
                        <label className="lable">
                            Number Of Shares:<i>*</i>
                        </label>
                        <div className='d-flex align-items-end'>
                            <input value={numberShares} onChange={(e) => setNumberShares(e.target.value)} autoCapitalize="off" autoComplete="off" autoCorrect="off" className="formInput" data-testid="Input" id="name" name="name" required="required" spellCheck="false" type="number" step={1} min={1} />
                            <span className='ms-2'>Tokens</span>
                        </div>
                    </div>
                    <div className="formSection col-sm-5">
                        <label className="lable">
                            Price Per Share:<i>*</i>
                        </label>
                        <div className='d-flex align-items-end'>
                            <input value={priceShares} onChange={(e) => setPriceShares(e.target.value)} autoCapitalize="off" autoComplete="off" autoCorrect="off" className="formInput" data-testid="Input" id="name" name="name" required="required" spellCheck="false" type="number" min={0.1} step={0.1} />
                            <span className='ms-2'>
                                <img style={{ width: "25px" }} src='/Images/unitIcon/Flow.png' alt='flow' />
                                <span>Flow</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center mt-4'>
                    <button type='submit' className="btn btn-primary" disabled="">Create Fractional NFT</button>
                </div>
            </form >
        </div >
    )
}