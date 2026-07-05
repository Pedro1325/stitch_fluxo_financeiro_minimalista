/**
 * app.js — "componentes" compartilhados do protótipo (header, navegação
 * inferior e botão flutuante de nova despesa).
 *
 * PROBLEMA QUE ESTE ARQUIVO RESOLVE (code smell: duplicação divergente):
 * Nos exports do Stitch, cada tela tinha um header DIFERENTE — tamanhos
 * de link diferentes, nomes de menu diferentes ("Expenses" numa tela,
 * "Transactions" em outra) e links mortos (href="#"). Navegação é a
 * âncora de identidade de um app: precisa ser idêntica em toda tela.
 *
 * A solução aqui imita o que o React fará depois com componentes:
 * cada página declara no <body> QUAL é (data-page="despesas") e este
 * script injeta o header/nav corretos, marcando o item ativo.
 * Quando você migrar, este arquivo vira os componentes <AppBar /> e
 * <BottomNav />, e o data-page vira a rota do React Router.
 */

(function () {
  "use strict"; // evita erros silenciosos (ex.: variável global acidental)

  /*
   * Fonte única de verdade da navegação.
   * Adicionar uma tela nova = adicionar UMA linha aqui,
   * e ela aparece automaticamente no menu desktop e no mobile.
   */
  const ITENS_NAV = [
    { id: "inicio", rotulo: "Início", icone: "home", href: "index.html" },
    { id: "despesas", rotulo: "Despesas", icone: "payments", href: "despesas.html" },
    { id: "categorias", rotulo: "Categorias", icone: "category", href: "categorias.html" },
    { id: "relatorios", rotulo: "Relatórios", icone: "analytics", href: "relatorios.html" },
    // Perfil só aparece na navegação mobile; no desktop o acesso é pelo avatar.
    { id: "perfil", rotulo: "Perfil", icone: "person", href: "perfil.html", apenasMobile: true },
  ];

  // Lê a configuração declarada pela página no <body>
  const paginaAtual = document.body.dataset.page || "";
  const tipoShell = document.body.dataset.shell || "completo";
  // "completo" → header + nav + FAB | "tarefa" → header compacto com voltar | "nenhum" → nada (login)

  /* ------------------------------------------------------------------ */
  /* Header (TopAppBar)                                                  */
  /* ------------------------------------------------------------------ */

  function montarLinksDesktop() {
    return ITENS_NAV.filter((item) => !item.apenasMobile)
      .map((item) => {
        const ativo = item.id === paginaAtual;
        // Link ativo: azul primário + negrito. Inativos: cinza com hover.
        const classes = ativo
          ? "text-primary font-bold"
          : "text-on-surface-variant hover:bg-surface-container-low";
        return `<a href="${item.href}"
                   class="text-label-caps uppercase px-sm py-xs rounded transition-colors ${classes}"
                   ${ativo ? 'aria-current="page"' : ""}>${item.rotulo}</a>`;
      })
      .join("");
  }

  function montarHeaderCompleto() {
    /*
     * CODE SMELLS REMOVIDOS em relação ao export original:
     * - Avatar vinha de uma URL externa do Google (podia sumir a qualquer
     *   momento) e usava "data-alt" — atributo inventado que leitores de
     *   tela ignoram. Trocado por um avatar de iniciais, sem dependência
     *   externa, que também é link para o Perfil.
     * - Logo usava text-display-lg (36px, tamanho de título de página)
     *   dentro do header; rebaixado para headline-md (24px).
     */
    return `
      <header class="w-full bg-surface border-b border-outline-variant sticky top-0 z-40">
        <div class="flex justify-between items-center px-lg py-md max-w-container-max mx-auto">

          <!-- Marca: leva sempre de volta ao início -->
          <a href="index.html" class="text-headline-md text-primary">FinanceFlow</a>

          <!-- Navegação principal: só no desktop (no mobile, vira barra inferior) -->
          <nav class="hidden md:flex gap-lg" aria-label="Navegação principal">
            ${montarLinksDesktop()}
          </nav>

          <div class="flex items-center gap-sm">
            <button type="button" aria-label="Notificações"
                    class="p-xs rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant">
              <span class="material-symbols-outlined" aria-hidden="true">notifications</span>
            </button>

            <!-- Avatar de iniciais: link para o perfil -->
            <a href="perfil.html" aria-label="Meu perfil"
               class="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-body-sm border border-outline-variant hover:opacity-90 transition-opacity">
              PH
            </a>
          </div>
        </div>
      </header>`;
  }

  function montarHeaderTarefa() {
    /*
     * Telas de "tarefa" (ex.: Nova Despesa) escondem a navegação de
     * propósito: menos distração enquanto o usuário preenche o
     * formulário. Só oferecem o caminho de volta.
     */
    const titulo = document.body.dataset.title || "";
    return `
      <header class="w-full bg-surface border-b border-outline-variant sticky top-0 z-40">
        <div class="flex items-center gap-md px-lg py-md max-w-container-max mx-auto">
          <a href="index.html" aria-label="Voltar"
             class="p-xs rounded-full hover:bg-surface-container-low transition-colors">
            <span class="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          </a>
          <h1 class="text-headline-md text-primary">${titulo}</h1>
        </div>
      </header>`;
  }

  /* ------------------------------------------------------------------ */
  /* Navegação inferior (mobile)                                         */
  /* ------------------------------------------------------------------ */

  function montarNavInferior() {
    /*
     * CODE SMELL REMOVIDO: o original usava <div> clicável para cada
     * item — div não é focável por teclado nem anunciada como link por
     * leitores de tela. Navegação se faz com <a>.
     */
    const itens = ITENS_NAV.map((item) => {
      const ativo = item.id === paginaAtual;
      const classes = ativo ? "text-primary font-bold" : "text-on-surface-variant";
      return `
        <a href="${item.href}" ${ativo ? 'aria-current="page"' : ""}
           class="flex flex-col items-center justify-center gap-1 ${classes} transition-all active:scale-95">
          <span class="material-symbols-outlined ${ativo ? "icon-filled" : ""}" aria-hidden="true">${item.icone}</span>
          <span class="text-label-caps text-[10px]">${item.rotulo}</span>
        </a>`;
    }).join("");

    return `
      <nav class="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center
                  bg-surface border-t border-outline-variant px-xs py-sm z-40"
           aria-label="Navegação inferior">
        ${itens}
      </nav>`;
  }

  /* ------------------------------------------------------------------ */
  /* FAB — botão flutuante de "Nova despesa"                             */
  /* ------------------------------------------------------------------ */

  function montarFab() {
    // É um <a> (navega para outra página), não um <button> (que executa ação na mesma página).
    return `
      <a href="nova-despesa.html" aria-label="Nova despesa"
         class="fixed bottom-24 right-lg md:bottom-lg w-16 h-16 bg-primary text-on-primary
                rounded-full shadow-lg flex items-center justify-center
                hover:scale-105 active:scale-95 transition-all z-50 group">
        <span class="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform duration-300"
              aria-hidden="true">add</span>
      </a>`;
  }

  /* ------------------------------------------------------------------ */
  /* Montagem: injeta os pedaços conforme o tipo de shell da página      */
  /* ------------------------------------------------------------------ */

  if (tipoShell === "completo") {
    document.body.insertAdjacentHTML("afterbegin", montarHeaderCompleto());
    document.body.insertAdjacentHTML("beforeend", montarNavInferior() + montarFab());
  } else if (tipoShell === "tarefa") {
    document.body.insertAdjacentHTML("afterbegin", montarHeaderTarefa());
    // Sem nav inferior nem FAB: a tela de tarefa pede foco no formulário.
  }
  // tipoShell === "nenhum" (login): página não recebe shell algum.
})();
