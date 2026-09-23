/* ==========================================================================
   Portfolio content — pulled from the Notion "Portfolio Projects" database.
   Edit this file to add/update projects; the page renders from this data.
   ========================================================================== */

const SITE = {
  name: "Timothy Cho",
  role: "Mechanical Engineering Student",
  school: "University of California, Irvine",
  tagline: "I design, build, and test mechanisms — from planar linkage kinematics on a whiteboard to physical robots that actually walk, grip, and fly.",
  email: "timothycho12345@gmail.com",
  linkedin: "https://www.linkedin.com/in/timothycho7/",
  github: "https://github.com/timothycho777",
  about: `Mechanical engineering student focused on the full pipeline of building
    physical, moving systems — kinematic design, CAD and simulation, manufacturing,
    and the electrical/firmware integration that turns a model into something that
    actually works on a bench. Recent work spans legged-robot mechanism design,
    a GPS-denied autonomous quadrotor build, and a competition robotic arm that
    took 1st place against 13 other teams.`,
};

// Aggregated / curated skill groups shown in the Skills section.
const SKILL_GROUPS = [
  {
    label: "CAD & Simulation",
    icon: "cube",
    skills: ["SolidWorks", "CAD Modeling", "Motion Analysis", "FEA", "GeoGebra (kinematics)"],
  },
  {
    label: "Manufacturing & Fabrication",
    icon: "wrench",
    skills: ["3D Printing", "Laser Cutting", "Tolerance Analysis", "Assembly & Test"],
  },
  {
    label: "Electronics & Controls",
    icon: "bolt",
    skills: ["Arduino / C++", "Motor Control", "Wiring Architecture", "ArduPilot"],
  },
  {
    label: "Autonomy & Software",
    icon: "chip",
    skills: ["NVIDIA Isaac Sim (planned)", "State Estimation", "Autonomous Navigation"],
  },
];

// Category filter keys must match `category` on each project below.
const CATEGORIES = ["All", "Robotics", "Mechanical Design"];

/* Each project:
   id           - slug, used for anchors
   name, oneLiner, role, timeframe, category, tags
   status       - Notion "Write-up Status" (shown as a small badge for non-polished ones)
   featured     - bool
   media        - { type: 'photos'|'diagram', items: [...] } or null
   sections     - the 6-part body write-up, any can be omitted
   subProjects  - ids of other project entries that are components of this one
   isSubProject - true if this should NOT appear in the main grid (only reachable
                  via its parent's "component write-ups" links)
*/
const PROJECTS = [
  {
    id: "legged-walking-robot",
    name: "Legged Walking Robot — Mechanism Design to Team Build",
    course: "MAE 183, Mechanism Design",
    oneLiner: "Carried a four-bar leg mechanism from kinematic design and simulated CAD through a physically built, team-fabricated 8-leg walking robot.",
    role: "Individual: leg-mechanism kinematics & CAD (sole designer). Team build: Electronics & Electrical Systems.",
    timeframe: "Spring – Jun 2026",
    category: "Robotics",
    tags: ["CAD", "SolidWorks", "Simulation", "Arduino/C++", "Manufacturing", "Controls"],
    status: "Draft Written",
    featured: true,
    media: { type: "diagram", key: "fourbar" },
    sections: {
      problem: `MAE 183 (mechanism design) ran as a two-stage arc: first an individual sequence
        synthesizing and validating a four-bar leg linkage in GeoGebra and SolidWorks, then a
        ~6-person team project that took that same rectilinear-linkage concept and built it into
        a physically fabricated, working walking robot. Together they cover the full path from
        planar kinematics to a driven physical prototype.`,
      contribution: `<strong>Individual coursework:</strong> sole designer — kinematic linkage
        synthesis in GeoGebra (comparing rectilinear, skew-pantograph, and pantograph foot-path
        variants off a Klann-type mechanism), then full CAD modeling and SolidWorks Motion
        Analysis of a quadruped walker built on the selected rectilinear linkage.<br><br>
        <strong>Team build ("Bear Walker"):</strong> owned Electronics &amp; Electrical Systems —
        verified motor, battery, and Arduino controller functionality, wired the drivetrain with
        Bluetooth control, assembled one of the team's eight leg mechanisms, and helped
        transport/store the physical assembly between sessions.`,
      approach: `Started from planar four-bar linkage theory: modeled a Klann-type leg mechanism
        in GeoGebra as paired static/dynamic systems, compared three foot-path-generating
        variants, then selected and iterated the rectilinear linkage through a full redesign pass.
        Modeled the mechanism and a complete quadruped assembly in SolidWorks — gearmotor, spur
        gear reduction, links, bearings, and hardware — and validated the design with a Motion
        Analysis simulating forward/backward/turning gait. The team then carried that linkage
        into a physical build: laser-cut wood legs and body panels, an Arduino-based controller
        with motor driver and Bluetooth module, and full electrical wiring. Subsystems were
        validated incrementally (a half-assembly Bluetooth test) before full integration, and the
        finished robot's center of gravity was calculated from measured leg contact forces to
        confirm walking stability before the final test run.`,
      challenges: `The first-pass leg linkage didn't produce the foot-path shape needed for a
        clean gait, so it was re-derived in GeoGebra and rebuilt in SolidWorks as a second
        iteration. On the team build, coordinating eight independent leg mechanisms into one
        working drivetrain meant validating subsystems before full integration — testing half the
        assembly over Bluetooth caught wiring issues early — and going from a CAD model to a
        working physical robot surfaced real motor/battery/controller wiring problems that
        simulation alone doesn't show.`,
      results: `Delivered a complete path from validated planar kinematics through a simulated
        CAD assembly (individual) to a fully working, physically fabricated quadruped robot
        (team) — with a SolidWorks Motion Analysis demonstrating gait in simulation, and a
        physical build with verified electronics, a Bluetooth-driven test run, and a measured
        center of gravity (CG ≈ (4.1, 4.1)) confirming real-world stability.`,
    },
    subProjects: ["quadruped-individual", "bear-walker-team"],
  },
  {
    id: "zotbotics-arm",
    name: "ZOTBotics — Robot Arm",
    course: "UCI ZOTBotics Makerspace (ZIMS)",
    oneLiner: "Designed the hand/finger end-effector for a 3D-printed robotic arm that beat 13 other teams to place 1st in a live Rock-Paper-Scissors competition.",
    role: "Mechanical Design Engineer — Hand/Finger End-Effector",
    timeframe: "Jan 2025 – May 2025",
    category: "Mechanical Design",
    tags: ["SolidWorks", "CAD", "Manufacturing", "3D Printing"],
    status: "Draft Written",
    featured: true,
    media: {
      type: "photos",
      items: [
        { src: "images/zotbotics-arm.jpg", alt: "Assembled BCN3D Moveo robotic arm with 3D-printed hand end-effector, mounted on a demo stand", caption: "Assembled arm with the 3D-printed hand end-effector" },
        { src: "images/zotbotics-team.jpg", alt: "Six-person ZOTBotics team posing with the finished robotic arm after placing 1st", caption: "The team after placing 1st of 14 in the Rock-Paper-Scissors competition" },
        // TODO: add the isometric CAD renders of the hand assembly here once provided —
        // e.g. { src: "images/zotbotics-hand-isometric.png", alt: "...", caption: "..." }
      ],
    },
    sections: {
      problem: `As part of ZOTBotics' Introductory Makerspace (ZIMS) program at UC Irvine, I
        worked with a team of six over five months (January–May 2025) to design, 3D print, and
        assemble a BCN3D Moveo robotic arm with a hand/finger end-effector that could form rock,
        paper, and scissors gestures on a button press — which randomly generated the arm's move
        — and compete head-to-head against other teams.`,
      contribution: `I was the Mechanical Design Engineer for the robotic hand: I helped
        articulate the hand/finger concept used to play rock-paper-scissors and collaborated with
        the team to manufacture the rest of the arm. I addressed manufacturing design risks and
        improved arm joint stability by roughly 25% through iterative CAD modifications and
        assembly tolerancing, and helped define the project phases and a team calibration plan.`,
      approach: `I modeled the hand and finger assemblies in SOLIDWORKS and fabricated the
        components via 3D printing on Bambu A1 printers. The initial finger-actuation design used
        spools mounted on each servo to wind thread that opened and closed the fingers — one spool
        on the palm pulling the top two fingers down, a second spool behind the fingers pulling
        them back up, with the thread guided through small loops at the fingertips; the thumb used
        the same two-spool concept. That approach failed in practice: the servos only rotate 180°
        (not 360°), which wasn't enough range to wind and unwind the thread as designed. I
        scrapped the spool mechanism and redesigned around cross-shaped and straight servo horns,
        which successfully actuated the fingers within the servos' available range of motion.
        Body components were 3D printed and assembled into the full arm; stepper motors were wired
        to their drivers, and an Arduino was programmed to control movement and execute the
        rock-paper-scissors gestures on a button press.`,
      challenges: `<ul>
          <li><strong>Spool-and-thread actuation didn't work</strong> — the servos' 180° range
            couldn't wind/unwind the thread as designed, so I redesigned the mechanism around
            cross-shaped and straight servo horns instead.</li>
          <li><strong>Servo horns slipped under load</strong> — the plastic horns didn't have
            teeth strong enough to grip the servo shaft. Fixed last-minute by securing the horns
            with super glue, which held through the competition; a metal horn with a clamping
            mechanism would be the more durable long-term fix.</li>
          <li><strong>Joint stability</strong> was improved roughly 25% through iterative CAD
            modifications and assembly tolerancing, addressing manufacturing design risks
            identified during early prototyping.</li>
          <li><strong>Weight</strong> — reduced infill density from 20% to 15% to lighten the
            hand, though the overall design remained bulkier than ideal.</li>
        </ul>`,
      results: `Delivered a complete, working robotic arm with a hand/finger end-effector that
        formed rock, paper, and scissors gestures on a button press that randomly generated the
        arm's move. Competing against 13 other teams in the final tournament, the team
        <strong>placed 1st</strong>.`,
      takeaways: `In a future iteration, I'd focus on slimming down the hand's overall weight and
        bulkiness without compromising function — the infill reduction helped, but the design was
        still bulkier than I'd like. I'd also switch from plastic to metal servo horns with a
        clamping mechanism, which would grip the servo shaft securely and eliminate the slipping
        issue that forced a super-glue fix.`,
    },
  },
  {
    id: "quadrotor",
    name: "Autonomous GPS-Denied Indoor Quadrotor",
    course: "Solo Build",
    oneLiner: "Designing and building a 250mm autonomous quadrotor for GPS-denied indoor navigation — custom CAD airframe, two-bus electrical architecture, and an ArduPilot flight stack.",
    role: "Solo builder — mechanical design, electrical integration, firmware, and autonomy, end to end.",
    timeframe: "Mar 2026 – Present",
    category: "Robotics",
    tags: ["CAD", "FEA", "Controls", "Manufacturing", "NVIDIA Isaac Sim"],
    status: "In Progress",
    featured: true,
    media: { type: "diagram", key: "quadrotor" },
    sections: {
      problem: `GPS-based navigation fails in exactly the environments where autonomous systems
        are needed most — collapsed buildings, underground facilities, and dense indoor spaces
        relevant to search-and-rescue. This project builds a 250mm quadrotor that can hold
        position and navigate waypoints indoors using only onboard sensors, no GPS.`,
      contribution: `Solo build, top to bottom: component selection, full-assembly CAD in
        SolidWorks, custom TPU prop-guard design, ESC/FC wiring and configuration, ArduPilot
        setup, and (planned) validating autonomy logic in NVIDIA Isaac Sim before it goes on
        hardware.`,
      approach: `An onboard estimator on ArduPilot combines IMU, optical-flow, and barometer
        readings for GPS-denied position holds. Custom parts — a vibration-isolated FC mount and
        4-spoke TPU prop guards — were modeled from scratch rather than sourced. Next up:
        building out an Isaac Sim environment to test navigation logic safely before it ever
        touches the physical airframe.`,
      challenges: `Iterative tolerance correction on the 3D-printed prop guards to fit the frame
        without adding vibration; a two-bus wiring architecture (high-current power bus kept
        physically separate from the low-current signal bus) to avoid a class of wiring failures
        common in scratch builds; a current-limited "smoke test" protocol before ever connecting a
        full battery, to catch wiring mistakes before they become visible damage.`,
      results: `In progress — Phase 1 of 5 (hardware foundation). Target milestones: stable
        indoor position hold within ±15cm (Phase 3) and a 4-waypoint autonomous indoor mission
        with no human intervention (Phase 4).`,
    },
  },

  /* --- Component write-ups (reachable from the consolidated Legged Walking
     Robot entry above; not shown in the main filterable grid). --- */
  {
    id: "quadruped-individual",
    name: "Quadruped Walking Robot — Leg Mechanism Design",
    course: "MAE 183, individual coursework",
    isSubProject: true,
    parent: "legged-walking-robot",
    oneLiner: "Designed and iterated a four-bar leg mechanism in GeoGebra, then modeled and motion-simulated a full quadruped walking robot in SolidWorks.",
    role: "Individual assignment — sole designer",
    timeframe: "Jun 2026",
    tags: ["CAD", "SolidWorks", "Simulation"],
    status: "Draft Written",
    media: {
      type: "photos",
      items: [
        { src: "images/quadruped-snorlax-cad.png", alt: "SolidWorks CAD assembly of the Snorlax-themed quadruped walking robot, showing two leg-linkage variants", caption: "SolidWorks CAD assembly of the Snorlax-themed quadruped walker" },
      ],
    },
    sections: {
      problem: `A 4-part homework sequence (HW1–HW4) synthesizing a four-bar leg linkage for a
        walking robot, iterating from planar kinematics to a fully simulated CAD assembly.`,
      approach: `Compared rectilinear, skew-pantograph, and pantograph foot-path variants off a
        Klann-type mechanism in GeoGebra, selected and redesigned the rectilinear linkage, then
        modeled a complete quadruped walker in SolidWorks and validated forward/backward/turning
        gait with a Motion Analysis simulation.`,
    },
  },
  {
    id: "bear-walker-team",
    name: "Bear Walker — Team Legged Robot",
    course: "MAE 183, team final project",
    isSubProject: true,
    parent: "legged-walking-robot",
    oneLiner: "6-person MAE 183 team designed, fabricated, and drove a physical 8-leg rectilinear-linkage walking robot; owned electronics/wiring and one leg subsystem.",
    role: "Electronics & Electrical Systems — motor wiring, battery connection, and Arduino controller integration",
    timeframe: "Spring 2026",
    tags: ["Arduino/C++", "Manufacturing", "Controls"],
    status: "Draft Written",
    media: {
      type: "photos",
      items: [
        { src: "images/bear-walker-cad.png", alt: "CAD render of the Bear Walker's laser-cut leg mechanism and body panels", caption: "CAD assembly of the Bear Walker's leg mechanism" },
        { src: "images/bear-walker-manufactured.png", alt: "The fully fabricated, laser-cut wood Bear Walker robot held up for a photo", caption: "The fully fabricated Bear Walker, laser-cut and assembled" },
        { src: "images/bear-walker-team-photo.png", alt: "The MAE 183 team working through the center-of-gravity calculation, with robot parts on the table", caption: "Working through the center-of-gravity calculation and final assembly" },
      ],
    },
    sections: {
      problem: `A ~6-person team took the rectilinear four-bar leg linkage concept and built it
        into a physically fabricated, working walking robot — laser-cut wood construction with
        Arduino + Bluetooth control.`,
      results: `Verified electronics, a Bluetooth-driven test run, and a measured center of
        gravity (CG ≈ (4.1, 4.1)) confirming real-world walking stability.`,
    },
  },
];
