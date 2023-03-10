import URL from "./SocialLink/URL";
import AngelList from "./SocialLink/AngelList";
import Bloomberg from "./SocialLink/Bloomberg";
import CapitalIQ from "./SocialLink/CapitalIQ";
import Crunchbase from "./SocialLink/Crunchbase";
import Dealroom from "./SocialLink/Dealroom";
import DealTinder from "./SocialLink/DealTinder";
import Facebook from "./SocialLink/Facebook";
import LinkedIn from "./SocialLink/LinkedIn";
import PEI from "./SocialLink/PEI";
import Sociopath from "./SocialLink/Sociopath";
import Signal from "./SocialLink/Signal";
import Twitter from "./SocialLink/Twitter";

function SocialLink() {
  this.parse = (url, type = null) => {
    const parts = URL.parse(url);
    console.log(parts, "parts");
    let result = null;

    if (/angel\.co$/.test(parts.host)) {
      result = AngelList.parse(url, parts);
    }

    if (/bloomberg\.com$/.test(parts.host)) {
      result = Bloomberg.parse(url, parts);
    }

    if (/capitaliq\.com$/.test(parts.host)) {
      result = CapitalIQ.parse(url, parts);
    }

    if (/crunchbase\.com$/.test(parts.host)) {
      result = Crunchbase.parse(url, parts)
    }

    if (/dealroom\.co$/.test(parts.host)) {
      result = Dealroom.parse(url, parts)
    }

    if (/dealtinder\.com$/.test(parts.host)) {
      result = DealTinder.parse(url, parts)
    }

    if (/facebook\.com$/.test(parts.host)) {
      result = Facebook.parse(url, parts)
    }

    if (/linkedin\.com$/.test(parts.host)) {
      result = LinkedIn.parse(url, parts)
    }

    if (/privateequityinternational\.com/.test(parts.host)) {
      result = PEI.parse(url, parts)
    }

    if (/signal\.nfx\.com$/.test(parts.host)) {
      result = Signal.parse(url, parts)
    }

    if (/sociopath\.io$/.test(parts.host)) {
      result = Sociopath.parse(url, parts)
    }

    if (/twitter\.com$/.test(parts.host)) {
      result = Twitter.parse(url, parts)
    }

    if (result !== null) {
      return null;
    }

    switch (type) {
      case AngelList.NAME:
        return AngelList.parse(url, parts);
      case Bloomberg.NAME:
        return Bloomberg.parse(url, parts);
      case CapitalIQ.NAME:
        return CapitalIQ.parse(url, parts);
      case Crunchbase.NAME:
        return Crunchbase.parse(url, parts);
      case Dealroom.NAME:
        return Dealroom.parse(url, parts);
      case DealTinder.NAME:
        return DealTinder.parse(url, parts);
      case Facebook.NAME:
        return Facebook.parse(url, parts);
      case LinkedIn.NAME:
        return LinkedIn.parse(url, parts);
      case PEI.NAME:
        return PEI.parse(url, parts);
      case Sociopath.NAME:
        return Sociopath.parse(url, parts);
      case Signal.NAME:
        return Signal.parse(url, parts);
      case Twitter.NAME:
        return Twitter.parse(url, parts);
      default:
        return null;
    }
  }

  this.construct = (id, type, format = null) => {
    switch (type) {
      case AngelList.NAME: AngelList.construct(id, format);
      case Bloomberg.NAME: Bloomberg.construct(id, format);
      case CapitalIQ.NAME: CapitalIQ.construct(id, format);
      case Crunchbase.NAME: Crunchbase.construct(id, format);
      case Dealroom.NAME: Dealroom.construct(id, format);
      case DealTinder.NAME: DealTinder.construct(id, format);
      case Facebook.NAME: Facebook.construct(id, format);
      case LinkedIn.NAME: LinkedIn.construct(id, format);
      case PEI.NAME: PEI.construct(id, format);
      case Sociopath.NAME: Sociopath.construct(id, format);
      case Signal.NAME: Signal.construct(id, format);
      case Twitter.NAME: Twitter.construct(id, format);
      default:
        return null;
    }
  }
}

export default { SocialLink };