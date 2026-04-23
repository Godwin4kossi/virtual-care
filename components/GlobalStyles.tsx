// components/GlobalStyles.tsx

export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600;700;800;900&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: 'Onest', sans-serif;
        background: #F8FAFF;
        color: #0B1F4B;
      }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-thumb { background: #BAE6FD; border-radius: 3px; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: none; }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }

      .anim-1 { animation: fadeUp .45s .05s both; }
      .anim-2 { animation: fadeUp .45s .15s both; }
      .anim-3 { animation: fadeUp .45s .25s both; }
      .anim-4 { animation: fadeUp .45s .35s both; }

      .card-hover { transition: transform .2s, box-shadow .2s; }
      .card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(11,31,75,.12) !important; }

      input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: .6; }
    `}</style>
  );
}