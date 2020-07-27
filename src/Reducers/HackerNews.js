import { getHackerNews } from '../Actions/types';

// const INIALSTATE = JSON.parse(localStorage.getItem("news")) || [];
const INIALSTATE = JSON.parse(localStorage.getItem("news")) || [
    {
      "by": "JeremyMorgan",
      "descendants": 59,
      "id": 22278576,
      "kids": [
        22279144,
        22278942,
        22282237,
        22279055,
        22281066,
        22279586,
        22279141,
        22279416,
        22279356,
        22280992,
        22279711,
        22280126,
        22279351,
        22280308,
        22279446,
        22278939,
        22279215,
        22279599,
        22280139,
        22279214,
        22279990,
        22278877
      ],
      "score": 101,
      "time": 1581197943,
      "title": "Analyzing the attacks on my website",
      "type": "story",
      "url": "https://dev.to/pluralsight/analyzing-the-attacks-on-my-website-30jf"
    },
    {
      "by": "pseudolus",
      "descendants": 2,
      "id": 22299642,
      "kids": [
        22299664
      ],
      "score": 7,
      "time": 1581438102,
      "title": "Coronavirus 'could infect 60% of global population if unchecked'",
      "type": "story",
      "url": "https://www.theguardian.com/world/2020/feb/11/coronavirus-expert-warns-infection-could-reach-60-of-worlds-population"
    },
    {
      "by": "new_guy",
      "descendants": 4,
      "id": 22279675,
      "kids": [
        22280851,
        22280812
      ],
      "score": 18,
      "time": 1581209286,
      "title": "Scientists supersize quantum mechanics: Largest ever object put in quantum state",
      "type": "story",
      "url": "https://www.nature.com/news/2010/100317/full/news.2010.130.html"
    },
    {
      "by": "colemorrison",
      "descendants": 53,
      "id": 22276941,
      "kids": [
        22279746,
        22278256,
        22278044,
        22278437,
        22279576
      ],
      "score": 86,
      "time": 1581182583,
      "title": "Modern cloud architecture on AWS: server fleets and databases",
      "type": "story",
      "url": "https://start.jcolemorrison.com/understanding-modern-cloud-architecture-on-aws-server-fleets-and-databases/"
    },
    {
      "by": "chmaynard",
      "descendants": 0,
      "id": 22278158,
      "score": 18,
      "time": 1581194025,
      "title": "The orbit that put men on the moon",
      "type": "story",
      "url": "https://www.johndcook.com/blog/2020/02/08/arenstorf-orbit/"
    },
    {
      "by": "winrid",
      "descendants": 15,
      "id": 22279407,
      "kids": [
        22281312,
        22281208,
        22282141,
        22281070,
        22281062,
        22281033
      ],
      "score": 49,
      "time": 1581205406,
      "title": "Fixng Nginx 502 Gateway Timeout with proxy_pass During Deployments",
      "type": "story",
      "url": "https://blog.winricklabs.com/(2-08-2020)-fixing-nginx-502-gateway-timeout-with-proxy_pass-during-deployments.html"
    },
    {
      "by": "luu",
      "descendants": 0,
      "id": 22279813,
      "score": 30,
      "time": 1581211709,
      "title": "Making Sense of Asynchrony in Interactive Data Visualizations (2018)",
      "type": "story",
      "url": "https://arxiv.org/abs/1806.01499"
    },
    {
      "by": "eaguyhn",
      "descendants": 41,
      "id": 22281832,
      "kids": [
        22281911,
        22282177,
        22283787,
        22283303,
        22282213,
        22282465,
        22282955
      ],
      "score": 142,
      "time": 1581252549,
      "title": "An optimization to help code compilation times on big CPUs",
      "type": "story",
      "url": "https://www.phoronix.com/scan.php?page=news_item&px=Linux-Pipe-Parallel-Job-Opt"
    },
    {
      "by": "fortran77",
      "descendants": 19,
      "id": 22283653,
      "kids": [
        22284750,
        22285534,
        22284534,
        22290611,
        22284556,
        22283937,
        22284498
      ],
      "score": 57,
      "time": 1581274609,
      "title": "Windows 10 Warning: Anger at Microsoft Rises with Serious New Failure",
      "type": "story",
      "url": "https://www.forbes.com/sites/gordonkelly/2020/02/08/windows-10-warning-serious-failure-provokes-questions-and-anger/#4edf3e7e7169"
    }
];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getHackerNews:
            return action.payload;
        default:
            return state;
    }
};