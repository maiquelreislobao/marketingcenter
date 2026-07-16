import { useEffect, useState } from "react";

export default function PortalMarketingLobao() {
  const [selectedDept, setSelectedDept] = useState(null);
  const [sortOption, setSortOption] = useState("asc");
  const [viewCounts, setViewCounts] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      const params = new URLSearchParams(window.location.search);
      const deptFromUrl = params.get("dept");

      if (deptFromUrl) {
        setSelectedDept(deptFromUrl);
      }

      const savedViews = window.localStorage.getItem(
        "marketing-service-views"
      );

      if (savedViews) {
        setViewCounts(JSON.parse(savedViews));
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }, []);

  const services = [
    {
  title: "Solicitar Merchandiser",
  description:
    "Agendamento de uma visita do merchandiser ao ponto de venda para organizar e otimizar o espaço destinado às nossas marcas.",
  icon: "🛍️",
  tag: "PDV",
  link: "https://clobao.atlassian.net/jira/software/projects/MKTMRCH/form/308",
  calendarLink:
    "https://clobao.atlassian.net/jira/software/projects/MKTMRCH/boards/749/calendar",
},
    {
      title: "Roadshow",
      description:
        "Solicitação de visita ao cliente revendedor com carrinha e promotor para apresentação de produtos.",
      icon: "🚐",
      tag: "Visita externa",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTRDS/form/804",
      calendarLink:
        "https://clobao.atlassian.net/jira/software/projects/MKTRDS/boards/1245/calendar",
    },
    {
      title: "Showroom",
      description:
        "Solicitação de reserva de espaço para receber clientes no showroom e realizar apresentações.",
      icon: "🏢",
      tag: "Reserva",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTSHOWR/form/605",
      calendarLink:
        "https://clobao.atlassian.net/jira/software/projects/MKTSHOWR/boards/980/calendar",
    },
    {
      title: "Solicitação de Materiais",
      description:
        "Pedido de brindes, catálogos e materiais de apoio para apresentações em lojas revendedoras.",
      icon: "📦",
      tag: "Apoio comercial",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTSOLCT/form/374",
    },
    {
      title: "Implantações/Expositores",
      description:
        "Solicitação de desenvolvimento de expositores, materiais para feiras e personalização de revendas.",
      icon: "🧩",
      tag: "Projetos especiais",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTIMP/form/506",
    },
    {
      title: "Gráfico",
      description:
        "Solicitação de produção de materiais gráficos como stickers, catálogos, folhetos promocionais e cartões de visita.",
      icon: "🎨",
      tag: "Criação gráfica",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTGRF/form/572",
    },
    {
      title: "Fotos",
      description:
        "Solicitação de produção de fotos de produtos para catálogos, websites e folhetos promocionais.",
      icon: "📸",
      tag: "Conteúdo visual",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTFOTOS/form/440",
    },
    {
      title: "Vídeos",
      description:
        "Solicitação de produção de vídeos de produtos, campanhas ou cobertura de eventos.",
      icon: "🎥",
      tag: "Audiovisual",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTVIDEOS/form/639",
    },
    {
      title: "Artworks",
      description:
        "Solicitação de artworks para materiais e necessidades do departamento de Compras.",
      icon: "🖼️",
      tag: "Criação",
      link: "https://clobao.atlassian.net/servicedesk/customer/portal/8",
    },
    {
      title: "Campanhas RH",
      description:
        "Solicitação de campanhas internas e ações de comunicação para Recursos Humanos.",
      icon: "📢",
      tag: "RH",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTRH/form/473",
    },
  ];

  const departmentMap = {
    Comercial: [
      "Solicitar Merchandiser",
      "Solicitação de Materiais",
      "Roadshow",
      "Implantações/Expositores",
      "Gráfico",
      "Showroom",
      "Fotos",
    ],
    Compras: [
      "Artworks",
      "Gráfico",
      "Showroom",
      "Fotos",
      "Vídeos",
      "Implantações/Expositores",
    ],
    Direção: services.map((service) => service.title),
    Logística: ["Solicitação de Materiais", "Gráfico"],
    Qualidade: ["Fotos", "Gráfico", "Solicitação de Materiais"],
    RH: [
      "Solicitação de Materiais",
      "Vídeos",
      "Fotos",
      "Gráfico",
      "Campanhas RH",
    ],
    SAC: [
      "Gráfico",
      "Solicitação de Materiais",
      "Roadshow",
      "Showroom",
      "Solicitar Merchandiser",
      "Fotos",
    ],
    SAT: ["Gráfico"],
  };

  const filteredServices = selectedDept
    ? services.filter((service) =>
        (departmentMap[selectedDept] || []).includes(service.title)
      )
    : services.filter((service) => service.title !== "Campanhas RH");

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortOption === "asc") {
      return a.title.localeCompare(b.title);
    }

    if (sortOption === "desc") {
      return b.title.localeCompare(a.title);
    }

    const viewsA = viewCounts[a.title] || 0;
    const viewsB = viewCounts[b.title] || 0;

    if (viewsB !== viewsA) {
      return viewsB - viewsA;
    }

    return a.title.localeCompare(b.title);
  });

  const handleDeptSelect = (department) => {
    try {
      setSelectedDept(department);

      if (typeof window === "undefined") return;

      const url = new URL(window.location.href);

      if (department) {
        url.searchParams.set("dept", department);
      } else {
        url.searchParams.delete("dept");
      }

      window.history.replaceState({}, "", url.toString());

      window.requestAnimationFrame(() => {
        const categoriesSection = document.getElementById("categorias");

        if (categoriesSection) {
          categoriesSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    } catch (error) {
      console.error("Erro ao atualizar filtro:", error);
    }
  };

  const handleServiceView = (title) => {
    try {
      const updatedViews = {
        ...viewCounts,
        [title]: (viewCounts[title] || 0) + 1,
      };

      setViewCounts(updatedViews);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "marketing-service-views",
          JSON.stringify(updatedViews)
        );
      }
    } catch (error) {
      console.error("Erro ao guardar visualizações:", error);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
          <div className="flex items-center justify-center md:justify-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <img
                src="/logo.png"
                alt="Central Lobão"
                className="h-10 w-10 object-contain"
              />
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            <a
              href="?"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 transition hover:border-red-500/40 hover:bg-zinc-800"
            >
              Início
            </a>

            <a
              href="#departamentos"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 transition hover:border-red-500/40 hover:bg-zinc-800"
            >
              Departamentos
            </a>

            <a
              href="#categorias"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 transition hover:border-red-500/40 hover:bg-zinc-800"
            >
              Categorias
            </a>
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((previous) => !previous)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-red-500/40 hover:bg-zinc-800 md:hidden"
          >
            <span className="text-lg">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-zinc-950/95 px-4 py-3 sm:px-6 md:hidden">
            <nav className="flex flex-col gap-2">
              <a
                href="?"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:border-red-500/40 hover:bg-zinc-800"
              >
                Início
              </a>

              <a
                href="#departamentos"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:border-red-500/40 hover:bg-zinc-800"
              >
                Departamentos
              </a>

              <a
                href="#categorias"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:border-red-500/40 hover:bg-zinc-800"
              >
                Categorias
              </a>
            </nav>
          </div>
        )}
      </header>

      <section className="border-b border-white/10 bg-gradient-to-br from-red-600 via-red-500 to-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              Central de solicitações de Marketing
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
              Portal interno para envio de solicitações ao departamento de
              Marketing através de formulários Jira organizados por categoria.
            </p>
          </div>
        </div>
      </section>

      <section
        id="departamentos"
        className="scroll-mt-24 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10"
      >
        <p className="mb-2 text-sm text-zinc-400">
          Clique no departamento para visualizar as solicitações recomendadas.
        </p>

        <h2 className="mb-5 text-xl font-black sm:text-2xl">
          Solicitar por departamento
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          <button
            type="button"
            onClick={() => handleDeptSelect(null)}
            className={`flex min-h-14 items-center justify-center rounded-xl border px-3 py-3 text-sm font-semibold transition sm:px-4 sm:py-4 ${
              !selectedDept
                ? "border-red-500 bg-red-500 text-white"
                : "border-white/10 bg-zinc-900 text-zinc-100 hover:border-red-500/40 hover:bg-zinc-800"
            }`}
          >
            Todos
          </button>

          {Object.keys(departmentMap).map((department) => (
            <button
              key={department}
              type="button"
              onClick={() => handleDeptSelect(department)}
              className={`flex min-h-14 items-center justify-center rounded-xl border px-3 py-3 text-sm font-semibold transition sm:px-4 sm:py-4 ${
                selectedDept === department
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-white/10 bg-zinc-900 text-zinc-100 hover:border-red-500/40 hover:bg-zinc-800"
              }`}
            >
              {department}
            </button>
          ))}
        </div>
      </section>

      <main
        id="categorias"
        className="scroll-mt-24 mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-14 lg:px-10"
      >
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-black sm:text-3xl">
              {selectedDept
                ? `Solicitações recomendadas para ${selectedDept}`
                : "Escolha a categoria da solicitação"}
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Cada categoria direciona para um formulário específico no Jira.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="grid grid-cols-1 gap-2 rounded-xl border border-white/10 bg-zinc-900 p-1 sm:flex sm:gap-2">
              {["asc", "desc", "views"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSortOption(option)}
                  className={`rounded-lg px-3 py-2 text-sm transition ${
                    sortOption === option
                      ? "bg-red-500 text-white"
                      : "text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  {option === "asc" && "Crescente"}
                  {option === "desc" && "Decrescente"}
                  {option === "views" && "Mais vistas"}
                </button>
              ))}
            </div>

            {selectedDept && (
              <button
                type="button"
                onClick={() => handleDeptSelect(null)}
                className="rounded-xl border border-white/10 px-4 py-2 text-center text-sm transition hover:border-red-500/40 hover:bg-zinc-800"
              >
                Limpar filtro
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sortedServices.map((service) => (
            <article
              key={service.title}
              className="flex h-full flex-col rounded-xl border border-white/10 bg-zinc-900 p-4 transition hover:-translate-y-1 hover:border-red-500/40"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <span className="text-2xl" aria-hidden="true">
                  {service.icon}
                </span>

                <span className="rounded-full border border-white/10 px-2 py-1 text-[11px] text-zinc-400">
                  {service.tag}
                </span>
              </div>

              <h3 className="text-base font-bold sm:text-lg">
                {service.title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-zinc-400">
                {service.description}
              </p>

              {sortOption === "views" && (
                <p className="mt-3 text-xs text-zinc-500">
                  Visualizações: {viewCounts[service.title] || 0}
                </p>
              )}

              <div className="mt-auto flex flex-col gap-2 pt-4">
                {service.calendarLink && (
                  <a
                    href={service.calendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/20 py-2.5 text-center transition hover:border-red-500/40 hover:bg-zinc-800"
                  >
                    Ver agenda
                  </a>
                )}

                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleServiceView(service.title)}
                  className="rounded-lg bg-white py-2.5 text-center font-medium text-black transition hover:bg-red-500 hover:text-white"
                >
                  Fazer solicitação
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>

      <a
        href="https://clobao.atlassian.net/jira/filters"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-2xl transition hover:scale-105 hover:bg-red-600"
      >
        🔎 Ver meus filtros
      </a>
    </div>
  );
}
