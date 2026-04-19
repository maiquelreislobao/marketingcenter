import { useEffect, useState } from "react";

export default function PortalMarketingLobao() {
  const [selectedDept, setSelectedDept] = useState(null);
  const [sortOption, setSortOption] = useState("asc");
  const [viewCounts, setViewCounts] = useState({});

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      const params = new URLSearchParams(window.location.search);
      const deptFromUrl = params.get("dept");
      if (deptFromUrl) setSelectedDept(deptFromUrl);

      const savedViews = window.localStorage.getItem("marketing-service-views");
      if (savedViews) setViewCounts(JSON.parse(savedViews));
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }, []);

  const services = [
    {
      title: "Merchandising",
      description:
        "Solicitação de organização de pontos de venda para fortalecer a presença da marca nas revendas.",
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
      link: "https://clobao.atlassian.net/jira/software/projects/MKTRDSH/form/407",
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
      title: "Implantações",
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
      title: "Digital",
      description:
        "Solicitação de posts, criação de conteúdo para blog e ações de e-mail marketing.",
      icon: "💻",
      tag: "Marketing digital",
      link: "https://clobao.atlassian.net/jira/core/projects/MAR/form/638",
    },
    {
      title: "Vídeos",
      description:
        "Solicitação de produção de vídeos de produtos, campanhas ou cobertura de eventos.",
      icon: "🎥",
      tag: "Audiovisual",
      link: "https://clobao.atlassian.net/jira/software/projects/MKTVIDEOS/form/639",
    },
  ];

  const departmentMap = {
    Comercial: [
      "Merchandising",
      "Solicitação de Materiais",
      "Roadshow",
      "Implantações",
      "Gráfico",
      "Showroom",
    ],
    Direção: services.map((s) => s.title),
    Logística: ["Solicitação de Materiais", "Gráfico"],
    RH: ["Digital", "Vídeos", "Fotos", "Gráfico"],
    SAC: [
      "Gráfico",
      "Solicitação de Materiais",
      "Roadshow",
      "Showroom",
      "Merchandising",
    ],
    SAT: ["Gráfico"],
  };

  const filteredServices = selectedDept
    ? services.filter((s) => (departmentMap[selectedDept] || []).includes(s.title))
    : services;

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortOption === "asc") return a.title.localeCompare(b.title);
    if (sortOption === "desc") return b.title.localeCompare(a.title);

    const viewsA = viewCounts[a.title] || 0;
    const viewsB = viewCounts[b.title] || 0;

    if (viewsB !== viewsA) return viewsB - viewsA;
    return a.title.localeCompare(b.title);
  });

  const handleServiceView = (title) => {
    try {
      const updated = {
        ...viewCounts,
        [title]: (viewCounts[title] || 0) + 1,
      };

      setViewCounts(updated);
      window.localStorage.setItem("marketing-service-views", JSON.stringify(updated));
    } catch (error) {
      console.error("Erro ao guardar visualizações:", error);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <header className="border-b border-white/10 bg-gradient-to-br from-red-600 via-red-500 to-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-14 w-14 rounded-lg bg-white/10 object-contain p-1"
              />
            </div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
              🚀 Portal de Solicitações de Marketing
            </div>

            <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              Central de solicitações de Marketing
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
              Portal interno para envio de solicitações ao departamento de Marketing através de formulários Jira organizados por categoria.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <p className="mb-2 text-sm text-zinc-400">Clique no departamento ou use um link direto</p>
        <h2 className="mb-5 text-xl font-black sm:text-2xl">Solicitar por departamento</h2>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {Object.keys(departmentMap).map((dept) => (
            <a
              key={dept}
              href={`?dept=${encodeURIComponent(dept)}`}
              className={`flex min-h-[56px] items-center justify-center rounded-xl border px-3 py-3 text-sm font-semibold transition sm:px-4 sm:py-4 ${
                selectedDept === dept
                  ? "border-red-500 bg-red-500"
                  : "border-white/10 bg-zinc-900 hover:border-red-500/40 hover:bg-zinc-800"
              }`}
            >
              {dept}
            </a>
          ))}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-14 lg:px-10">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-black sm:text-3xl">
              {selectedDept
                ? `Solicitações recomendadas para ${selectedDept}`
                : "Escolha a categoria da solicitação"}
            </h2>
            <p className="text-sm text-zinc-400">Cada categoria leva a um formulário específico no Jira.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex gap-2 rounded-xl border border-white/10 bg-zinc-900 p-1">
              {["asc", "desc", "views"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSortOption(opt)}
                  className={`px-3 py-2 text-sm rounded-lg ${
                    sortOption === opt ? "bg-red-500 text-white" : "text-zinc-300"
                  }`}
                >
                  {opt === "asc" && "Crescente"}
                  {opt === "desc" && "Decrescente"}
                  {opt === "views" && "Mais vistas"}
                </button>
              ))}
            </div>

            {selectedDept && (
              <a href="?" className="px-4 py-2 text-sm border rounded-xl">
                Limpar filtro
              </a>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sortedServices.map((service) => (
            <div key={service.title} className="p-4 border rounded-xl bg-zinc-900 flex flex-col">
              <div className="flex justify-between mb-3">
                <span>{service.icon}</span>
                <span className="text-xs">{service.tag}</span>
              </div>

              <h3 className="font-bold">{service.title}</h3>
              <p className="text-sm text-zinc-400">{service.description}</p>

              <div className="mt-auto flex flex-col gap-2 pt-4">
                <a
                  href={service.link}
                  target="_blank"
                  onClick={() => handleServiceView(service.title)}
                  className="bg-white text-black text-center py-2 rounded-lg"
                >
                  Abrir formulário
                </a>

                {service.calendarLink && (
                  <a
                    href={service.calendarLink}
                    target="_blank"
                    className="border text-center py-2 rounded-lg"
                  >
                    Ver agenda
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
