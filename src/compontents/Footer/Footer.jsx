import amazonPayLogo from "../../assets/imgs/amazon-pay.png";
import americanExpressLogo from "../../assets/imgs/American-Express-Color.png";
import masterCardLogo from "../../assets/imgs/mastercard.webp";
import paypalLogo from "../../assets/imgs/paypal.png";
import appStoreLogo from "../../assets/imgs/get-apple-store.png";
import googlePlayLogo from "../../assets/imgs/get-google-play.png";

export default function Footer() {
  return (
    <footer className="bg-slate-100 py-8">
      <div className="container mx-auto px-4 space-y-6">
        {/* App Promotion Section */}
        <header className="text-center lg:text-left">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Get The FreshCart App</h2>
          <p className="text-slate-400">We will send you a link, open it on your phone to download the app</p>
        </header>

        {/* Email Input Section */}
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
          <input
            type="email"
            className="form-control grow max-w-md p-2 border border-slate-300 rounded-md"
            placeholder="Email Address"
          />
          <button className="btn text-sm uppercase bg-primary-800 hover:bg-primary-900 text-white font-semibold px-4 py-2 rounded-md">
            Share App Link
          </button>
        </div>

        {/* Payment and Download Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center py-4 border-t-2 border-b-2 border-slate-300 border-opacity-50 gap-6">
          {/* Payment Partners */}
          <div className="payment-partners flex flex-wrap justify-center lg:justify-start gap-3 items-center">
            <h3 className="mr-2 text-lg font-medium">Payment Partners</h3>
            {[amazonPayLogo, americanExpressLogo, masterCardLogo, paypalLogo].map((logo, index) => (
              <img key={index} className="w-20 lg:w-24" src={logo} alt="Payment Partner Logo" />
            ))}
          </div>

          {/* App Download Links */}
          <div className="download flex flex-wrap justify-center lg:justify-start gap-3 items-center">
            <h3 className="mr-2 text-lg font-medium">Get deliveries with FreshCart</h3>
            <img className="w-24" src={appStoreLogo} alt="Download on the App Store" />
            <img className="w-[110px]" src={googlePlayLogo} alt="Get it on Google Play" />
          </div>
        </div>
      </div>
    </footer>
  );
}
