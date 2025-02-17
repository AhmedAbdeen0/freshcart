import amazonPayLogo from "../../assets/imgs/amazon-pay.png";
import americanExpressLogo from "../../assets/imgs/American-Express-Color.png";
import masterCardLogo from "../../assets/imgs/mastercard.webp";
import paypalLogo from "../../assets/imgs/paypal.png";
import appStoreLogo from "../../assets/imgs/get-apple-store.png";
import googlePlayLogo from "../../assets/imgs/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 py-8">
        <div className="container space-y-4">
          <header>
            <h2 className="text-xl font-semibold text-slate-800">Get The FreshCart App</h2>
            <p className="text-slate-400">We will send you a link, open it on your phone to download the app</p>
          </header>
          <div className="flex gap-2 flex-wrap">
            <input type="email" className="form-control grow" placeholder="Email Address" />
            <button className="btn text-sm uppercase bg-primary-800 hover:border-e-primary-900 text-white font-semibold">
              Share App Link
            </button>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center py-4 border-y-2 border-slate-300 border-opacity-50">
            <div className="payment-partners flex gap-3 items-center mb-4 lg:mb-0">
              <h3 className="mr-2">Payment Partners</h3>
              <img className="w-24" src={amazonPayLogo} alt="amazonPayLogo" />
              <img className="w-24" src={americanExpressLogo} alt="americanExpressLogo" />
              <img className="w-20" src={masterCardLogo} alt="masterCardLogo" />
              <img className="w-24" src={paypalLogo} alt="paypalLogo" />
            </div>
            <div className="download flex gap-3 items-center">
              <h3 className="mr-2">Get deliveries with FreshCart</h3>
              <img className="w-24" src={appStoreLogo} alt="appStoreLogo" />
              <img className="w-[110px]" src={googlePlayLogo} alt="googlePlayLogo" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
