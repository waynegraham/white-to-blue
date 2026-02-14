import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const styles = {
  page: "mx-auto max-w-5xl px-4 sm:px-6 xl:px-0",
  main: "mt-6 flex min-w-0 flex-auto flex-col px-2 pb-8 md:px-2",
  hero:
    "rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-cyan-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/40",
  heroTitle:
    "inline-block bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl print:bg-none print:bg-clip-border print:text-black",
  guideLead: "mt-4 max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-200/90",
  actionWrap: "mt-6",
  backButton:
    "inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2 text-white shadow-lg shadow-blue-700/30 transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
  sectionNav:
    "mt-6 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70",
  sectionNavLabel: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400",
  sectionNavLinks: "mt-3 flex flex-wrap gap-2",
  sectionNavLink:
    "rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 transition hover:border-blue-400 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-600 dark:text-slate-200 dark:hover:border-blue-400",
  contentWrap: "mx-auto mt-6 flex w-full max-w-4xl flex-col gap-6",
  article: "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70",
  sectionHeading: "text-2xl font-bold text-slate-900 dark:text-slate-100",
  sectionSubheading: "mt-6 text-xl font-semibold text-slate-900 dark:text-slate-100",
  bodyText: "mt-4 text-base leading-7 text-slate-700 dark:text-slate-200/90",
  sectionList: "mt-3 list-disc space-y-2 ps-5 text-base leading-7 text-slate-800 marker:text-blue-500 dark:text-slate-200",
  cardList: "mt-2 list-disc space-y-1 ps-5 text-sm leading-6 text-slate-700 marker:text-blue-500 dark:text-slate-200",
  noteBox: "mt-5 rounded-xl border-l-4 border-blue-500 bg-blue-50/80 p-4 text-slate-800 dark:bg-blue-950/30 dark:text-slate-200",
  planGrid: "mt-4 grid gap-4 md:grid-cols-2",
  planCard: "rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900",
  planCardHeading: "text-lg font-semibold text-slate-900 dark:text-slate-100",
};

function GuideNavLink({ href, children }) {
  return (
    <a href={href} className={styles.sectionNavLink}>
      {children}
    </a>
  );
}

function GuideSection({ id, title, children }) {
  return (
    <article id={id} className={styles.article}>
      <h2 className={styles.sectionHeading}>{title}</h2>
      {children}
    </article>
  );
}

function PlanCard({ title, children }) {
  return (
    <div className={styles.planCard}>
      <h3 className={styles.planCardHeading}>{title}</h3>
      <ul className={styles.cardList}>{children}</ul>
    </div>
  );
}

function TestPreparationGuide({ onNavigate }) {
  const goToCurriculum = () => {
    if (typeof onNavigate === "function") {
      onNavigate("/");
      return;
    }

    window.location.assign("/");
  };

  return (
    <section className={styles.page}>
      <Navigation />
      <main className={styles.main}>
        <header className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Test Preparation Guide
          </h1>
          <p className={styles.guideLead}>
            Congratulations, you got <strong>"the email"</strong> (or your instructor
            told you) that it is time to prepare for your test. You already know
            the moves. This guide helps structure practice sessions so you can
            ease nerves and perform with control and composure.
          </p>
          <div className={styles.actionWrap}>
            <button
              onClick={goToCurriculum}
              className={styles.backButton}
              type="button"
            >
              Back to Curriculum
            </button>
          </div>
        </header>

        <nav aria-label="Guide sections" className={styles.sectionNav}>
          <p className={styles.sectionNavLabel}>On This Page</p>
          <div className={styles.sectionNavLinks}>
            <GuideNavLink href="#overview">Overview</GuideNavLink>
            <GuideNavLink href="#plan-30-day">30-Day Plan</GuideNavLink>
            <GuideNavLink href="#shark-tank">Shark Tank Strategy</GuideNavLink>
          </div>
        </nav>

        <div className={styles.contentWrap}>
          <GuideSection id="overview" title="Overview">
            <p className={styles.bodyText}>
              Almost everyone at this stage feels some imposter syndrome. This
              test is meant to show how much you have learned and that you can
              perform while being observed.
            </p>
            <p className={styles.bodyText}>
              The test has two parts: technique and a shark tank. You are being
              evaluated on clean execution, order, control, and composure.
            </p>
            <p className={styles.bodyText}>
              Select a uke who is close to your size, has completed this test,
              and can support your prep sessions and test-day logistics.
            </p>
            <h3 className={styles.sectionSubheading}>Common Mistakes</h3>
            <ul className={styles.sectionList}>
              <li>Rushing through techniques</li>
              <li>Skipping key positional moments</li>
            </ul>
            <h3 className={styles.sectionSubheading}>Training Structure</h3>
            <p className={styles.bodyText}>
              Train in the exact order of the list since the test follows this
              sequence. Repeating the order builds muscle memory.
            </p>
            <h3 className={styles.sectionSubheading}>Session Flow</h3>
            <ul className={styles.sectionList}>
              <li>Say the technique name out loud</li>
              <li>Perform it slowly (about 50% speed)</li>
              <li>Reset and repeat 3 times</li>
              <li>Move to the next technique</li>
              <li>Write down exactly what is giving you trouble</li>
            </ul>
            <div className={styles.noteBox}>
              <p className="text-base leading-7">
                <strong>Non-negotiable:</strong> After each session, bring specific
                questions to a higher belt or instructor so errors are corrected
                quickly.
              </p>
            </div>
            <h3 className={styles.sectionSubheading}>What to Write Down</h3>
            <ul className={styles.sectionList}>
              <li>Where you hesitated</li>
              <li>What felt awkward</li>
              <li>Where you lose pressure</li>
              <li>Anything you consistently forget</li>
            </ul>
            <h3 className={styles.sectionSubheading}>How to Ask Better Questions</h3>
            <ul className={styles.sectionList}>
              <li>Where should my weight be during this transition?</li>
              <li>Why do I lose my balance here?</li>
            </ul>
            <p className={styles.bodyText}>
              This test is meant to be uplifting. Train slowly, reflect honestly,
              and keep it simple. Calm is confidence.
            </p>
          </GuideSection>

          <GuideSection id="plan-30-day" title="30-Day Plan">
            <div className={styles.planGrid}>
              <PlanCard title="Week 1 - Organize">
                <li>Watch videos to associate names with techniques</li>
                <li>Drill techniques in order with the 3x session flow</li>
                <li>Focus on slow, clean reps</li>
                <li>Write down trouble points each session</li>
                <li>Ask at least one technical question</li>
              </PlanCard>
              <PlanCard title="Week 2 - Smoothness">
                <li>Perform 10-15 techniques in sequence without stopping</li>
                <li>Track repeated weak spots</li>
                <li>Ask technical questions and refine details</li>
              </PlanCard>
              <PlanCard title="Week 3 - Simulation">
                <li>Run one mock test early in the week</li>
                <li>Run one full mock test at the end of the week</li>
                <li>Film and review if possible</li>
                <li>Prioritize after-class rolls and open mat</li>
              </PlanCard>
              <PlanCard title="Week 4 - Calm Rehearsal">
                <li>Complete two full mock tests at controlled pace</li>
                <li>Use live rolls for cardio and composure</li>
                <li>Prioritize breathing and defensive discipline</li>
              </PlanCard>
            </div>
          </GuideSection>

          <GuideSection id="shark-tank" title="Shark Tank Strategy">
            <p className={styles.bodyText}>
              After the technique portion, expect two 10-minute rounds with a
              new partner roughly every 30 seconds. The goal is composure and
              defensive ability, not domination.
            </p>
            <div className={styles.noteBox}>
              <p className="text-base leading-7">
                <strong>You do not get a medal for not tapping.</strong>
              </p>
            </div>
            <h3 className={styles.sectionSubheading}>Priorities</h3>
            <ul className={styles.sectionList}>
              <li>Frames first</li>
              <li>Guard retention</li>
              <li>Inside position</li>
              <li>Grip discipline</li>
              <li>Controlled breathing</li>
              </ul>
          </GuideSection>
        </div>
      </main>
      <Footer />
    </section>
  );
}

export default TestPreparationGuide;
