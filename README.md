## 春原營造企業官網 Prototype

此專案為多頁式（MPA）企業官網 Prototype，使用 **Vite + Tailwind CSS + 原生 JavaScript**，並以外部訪客為主要使用者。資訊架構、導覽邏輯與卡片化呈現參考營造業官網，但所有內容與素材皆為示意假資料。

### 啟動方式

1. 安裝套件：

```bash
npm install
```

2. 啟動開發伺服器：

```bash
npm run dev
```

3. 瀏覽：

預設在 `http://localhost:5173/`

### 專案結構

- `index.html`：首頁 `/`
- `about/`：關於春原 `/about`
- `services/`：核心能力總覽 `/services`
- `services/building/`：建築工程 `/services/building`
- `services/civil/`：土木工程 `/services/civil`
- `services/management/`：專案與維運管理 `/services/management`
- `projects/`：工程實績列表與篩選 `/projects`
- `projects/representative/`：代表工程 `/projects/representative`
- `projects/ongoing/`：進行中工程 `/projects/ongoing`
- `projects/map/`：工程地圖 `/projects/map`
- `projects/detail.html`：專案詳頁（以 `?slug=` 讀取專案）
- `quality/`：品質與肯定 `/quality`
- `media/`：影音與消息 `/media`
- `contact/`：聯絡我們 `/contact`
- `careers/`：人才招募 `/careers`
- `employee-login/`：員工專區入口 `/employee-login`（不出現在主導覽）

程式與資源：

- `src/styles/main.css`：Tailwind 入口與全域設計系統（字級、按鈕、卡片、Tag、表單、Lightbox 等）
- `src/components/layout.js`：共用 Navbar / Footer，含 RWD、滾動縮小、目前頁高亮與手機抽屜行為
- `src/components/cards.js`：Project / Service / News / Video 卡片模板
- `src/data/projects.json`：全站共用之工程專案假資料
- `src/pages/home.js`：首頁組件化注入（核心能力卡、代表工程、消息與影音）
- `src/pages/projects-list.js`：工程實績列表與 `type` + `status` 篩選邏輯
- `src/pages/project-detail.js`：專案詳頁渲染邏輯與 Gallery / Lightbox / 相關工程
- `src/pages/contact.js`：聯絡表單驗證與成功狀態顯示

建置設定：

- `vite.config.js`：Vite 多頁輸出設定（每個 HTML 入口對應一個路由）
- `tailwind.config.cjs`：Tailwind 設定（字體、主色綠、副色橘、陰影等）
- `postcss.config.cjs`：Tailwind + Autoprefixer 設定

### 驗收清單對照

- **路由可達成**
  - 首頁 `/` 可點擊導覽到 `/projects`、`/projects/detail.html?slug=...`、`/contact` 等頁面。
  - 所有指定路由皆有對應頁面並透過 Navbar / 內文連結可達。

- **工程實績篩選**
  - `/projects` 頁面載入 `src/data/projects.json`。
  - 提供「工程類型（type）」與「工程狀態（status）」兩組篩選，為即時前端篩選，卡片數量會隨之變動。

- **專案詳頁**
  - 使用 `/projects/detail.html?slug=...` 讀取 `projects.json` 中資料。
  - 呈現首圖區域（示意）、四欄摘要（地點、類型、規模、工期）、亮點說明、Gallery + Lightbox、相關工程 3 案與聯絡 CTA。

- **聯絡表單**
  - `/contact` 頁面具備 Input / Select / Textarea。
  - 必填欄位驗證與錯誤訊息顯示。
  - 送出後不呼叫後端，會清空表單並顯示成功狀態區塊，符合「表單可送出並看到成功狀態」。

- **RWD 與導覽**
  - Navbar：
    - 桌機：固定置頂，向下捲動時高度縮小並加上陰影。
    - 手機：漢堡選單展開全螢幕抽屜，開啟時鎖定背景捲動。
    - 目前頁：依路徑高亮對應選單項目。
    - 右側有員工專區入口（非主導覽項目）與聯絡 CTA 按鈕。
  - 版型於 390 / 768 / 1024 / 1440 寬度下皆為響應式，無明顯破版。

- **設計系統規則**
  - 字體：`Noto Sans TC` 搭配 `Inter`，由 Tailwind `fontFamily.sans` 統一設定。
  - 字級：H1 / H2 / H3、Body、Caption 由 `main.css` 中的 base style 控管。
  - 間距：Section 使用 80–96px（對應 `py-16~24`），卡片內距 16–24。
  - 色彩：
    - 主色綠：Navbar、標題強調、關鍵區塊背景、Primary Button。
    - 副色橘：僅用於 `.btn-accent`（主要 CTA）與互動狀態，未用於一般裝飾。
    - 灰階：背景分區與次要文字。

- **員工專區**
  - `/employee-login` 頁面僅透過 Navbar 右側次入口進入，不在主導覽清單中。
  - 顯示內部系統連結占位與「需登入」提示文案。 


