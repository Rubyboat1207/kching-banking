import { useEffect, useState } from "react";
import horizontal from "../assets/horizontal.png"
import vertical from "../assets/vertical.png"

class Advert {
  constructor(public horizSrc: string, public vertSrc: string, public url: string) { }
}

function Advertisment({ layout,  }: { layout: "horiz" | "vert" }) {
  function getRandomAd() {
    const ads = [
      new Advert(horizontal, vertical, 'https://tinyurl.com/3te565vm')
    ]

    return ads[Math.random() * (ads.length - 1)];
  }

  const disableAds = true;

  const [advert, setAdvert] = useState<Advert | null>(null)

  useEffect(() => {
    setAdvert(getRandomAd())
  }, [ ])

  if(!advert || disableAds) {
    return;
  }

  if(sessionStorage.getItem('group_name') == 'jameswright') {
    return;
  }

  if (layout === "horiz") {
    return (
      <div>
        <div className="adTitle">Your Ad could be here!</div>
        <a href={advert.url} target="_blank">
          <img src={advert.horizSrc} className="horizAd" />
        </a>
      </div>
    );
  } else {
    return (
      <div className="width">
        <div className="adTitle">Your Ad could be here!</div>
        <a href={advert.url} target="_blank">
          <img src={advert.vertSrc} className="vertAd" />
        </a>
      </div>
    );
  }
}

export default Advertisment;
