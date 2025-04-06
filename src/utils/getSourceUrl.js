// src/utils/getSourceUrl.js

export const getSourceUrl = (dorm) => {
    const name = dorm.name;
    const neighborhood = dorm.neighborhood;
  
    const overrides = [
      {
        match: n => n.includes("FloMo East"),
        url: "https://resed.stanford.edu/neighborhoods/olive-neighborhood/olive-houses/flomo-east-alondra-cardenal-and-faisan",
      },
      {
        match: n => n.includes("FloMo West"),
        url: "https://resed.stanford.edu/neighborhoods/olive-neighborhood/olive-houses/flomo-west-gavilan-loro-mirlo-and-paloma",
      },
      {
        match: n => n === "Meier/Naranja",
        url: "https://resed.stanford.edu/neighborhoods/redwood-neighborhood/redwood-houses/meiernaranja",
      },
      {
        match: n => n === "Norcliffe/Adelfa",
        url: "https://resed.stanford.edu/neighborhoods/redwood-neighborhood/redwood-houses/norcliffeadelfa",
      },
      {
        match: n => n === "Castaño",
        url: "https://resed.stanford.edu/wisteria/wisteria-houses/castano",
      },
      {
        match: n => n.includes("Moore"),
        url: "https://resed.stanford.edu/neighborhoods/rowan/rowan-houses/robert-moore-south-bob",
      },
      {
        match: n => n.includes("Alpha Phi"),
        url: "https://resed.stanford.edu/neighborhoods/rowan/rowan-houses/alpha-phikappa-kappa-gamma",
      },
      {
        match: n => n.includes("Warehaus"),
        url: "https://resed.stanford.edu/neighborhoods/rowan/rowan-houses/warehaus",
      },
      {
        match: n => n.includes("Chi Omega"),
        url: "https://resed.stanford.edu/neighborhoods/rowan/rowan-houses/alpha-kappa-delta-phichi-omega",
      },
    ];
  
    for (const override of overrides) {
      if (override.match(name)) {
        return override.url;
      }
    }
  
    const slug = name.toLowerCase().replace(/ /g, '-');
  
    if (neighborhood === 'Wisteria') {
      return `https://resed.stanford.edu/wisteria/wisteria-houses/${slug}`;
    }
  
    if (neighborhood === 'Rowan') {
      return `https://resed.stanford.edu/neighborhoods/rowan/rowan-houses/${slug}`;
    }
  
    return `https://resed.stanford.edu/neighborhoods/${neighborhood}-neighborhood/${neighborhood}-houses/${slug}`;
  };
  