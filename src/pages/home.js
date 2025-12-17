import { initLayout } from '../components/layout.js';
import { createProjectCard, createServiceCard, createNewsCard, createVideoCard } from '../components/cards.js';
import projects from '../data/projects.json';

function initHeroProjects() {
  const container = document.querySelector('[data-home-projects]');
  if (!container) return;
  const highlight = projects.slice(0, 6);
  container.innerHTML = '';
  highlight.forEach((p) => container.appendChild(createProjectCard(p)));
}

function initCoreServices() {
  const container = document.querySelector('[data-home-services]');
  if (!container) return;
  const data = [
    {
      badge: '建',
      title: '建築工程',
      subtitle: '企業總部、醫療建築與智慧校園等多元建築型態',
      points: ['結構與機電一體整合', 'BIM 應用與協同設計', '公共與民間建築標案管理'],
      href: '/services/building/'
    },
    {
      badge: '土',
      title: '土木工程',
      subtitle: '交通、水利與公共建設的長期合作夥伴',
      points: ['捷運與道路工程', '水庫與堤防結構安全', '園區與基礎設施開發'],
      href: '/services/civil/'
    },
    {
      badge: '管',
      title: '專案與維運管理',
      subtitle: '從工地到後續維運的全生命週期管理',
      points: ['工安與環安衛管理', '教育訓練與知識傳承', 'CSR 與在地共榮'],
      href: '/services/management/'
    }
  ];
  container.innerHTML = '';
  data.forEach((s) => container.appendChild(createServiceCard(s)));
}

function initNewsAndMedia() {
  const newsContainer = document.querySelector('[data-home-news]');
  const videoContainer = document.querySelector('[data-home-videos]');
  if (newsContainer) {
    const news = [
      {
        category: '公司消息',
        date: '2025-07-15',
        title: '春原營造榮獲示意工程品質金質獎',
        summary: '此處為假文案，用於展示最新消息卡片。實際上線時可放入得獎內容與工程名稱等資訊。'
      },
      {
        category: '工程進度',
        date: '2025-06-30',
        title: '北區捷運延伸段土建工程里程碑達成',
        summary: '此處為假文案，用於展示最新消息卡片。可說明施工進度與重要節點。'
      },
      {
        category: '永續與 ESG',
        date: '2025-05-20',
        title: '發布年度永續報告書與工地減碳行動',
        summary: '此處為假文案，用於展示最新消息卡片。'
      }
    ];
    newsContainer.innerHTML = '';
    news.forEach((n) => newsContainer.appendChild(createNewsCard(n)));
  }
  if (videoContainer) {
    const videos = [
      {
        category: '工程紀錄',
        title: '代表工程空拍縮時紀錄（示意影片）'
      },
      {
        category: '品牌故事',
        title: '春原團隊的一天（示意影片）'
      }
    ];
    videoContainer.innerHTML = '';
    videos.forEach((v) => videoContainer.appendChild(createVideoCard(v)));
  }
}

function initHomePage() {
  initLayout();
  initHeroProjects();
  initCoreServices();
  initNewsAndMedia();
}

initHomePage();


