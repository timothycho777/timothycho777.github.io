/* ==========================================================================
   Portfolio content. Source of truth: the Career OS Experience Bank (Notion).
   Every claim here must be supported there. Edit this file to add/update
   projects; the page renders from this data.

   RULES: only claim what is documented; nothing flown or configured on the
   quadrotor is claimed; simulation results are labeled as simulation.
   ========================================================================== */

const SITE = {
  name: "Timothy Cho",
  role: "Mechanical Engineering Student",
  school: "University of California, Irvine",
  tagline: "I design, build, and test mechanical systems: from kinematic CAD and FEA to 3D-printed, wired-up prototypes that move.",
  email: "timothycho12345@gmail.com",
  linkedin: "https://www.linkedin.com/in/timothycho7/",
  github: "https://github.com/timothycho777",
  about: `Mechanical engineering student at UC Irvine focused on mechanical design and
    prototyping: SolidWorks CAD and simulation, 3D-printed and team-fabricated hardware, and
    the electrical wiring that gets a design running on a bench. I designed the hand
    end-effector for a robotic arm that placed 1st of 14 teams, took a four-bar leg mechanism
    from kinematic design to a team-built walking robot, and am now building a quadrotor for
    GPS-denied indoor navigation, starting with a redesigned prop guard compared by FEA.`,
  // Shown in the hero. Static facts only (see Education & Skills in the Experience Bank).
  stats: [
    { num: "1st of 14", label: "Robot-arm competition" },
    { num: "CSWA", label: "SolidWorks certified" },
    { num: "Jun 2027", label: "Scheduled graduation" },
  ],
};

// Curated skill groups shown in the Skills section. Terms that are only
// defensible in context (ArduPilot, ROS 2, Python, welding, laser cutting)
// stay out of this list and appear, scoped, inside project write-ups.
const SKILL_GROUPS = [
  {
    label: "CAD & Simulation",
    icon: "cube",
    skills: ["SolidWorks", "SolidWorks Simulation (FEA)", "SolidWorks Motion Analysis", "AutoCAD", "GeoGebra (kinematics)"],
  },
  {
    label: "Prototyping & Fabrication",
    icon: "wrench",
    skills: ["3D Printing (PLA, TPU)", "Bambu A1 / Orca Slicer", "Tolerance Corrections", "Assembly & Test"],
  },
  {
    label: "Electronics",
    icon: "bolt",
    skills: ["Arduino", "Motor & Battery Wiring", "Soldering", "Multimeter / Oscilloscope"],
  },
  {
    label: "Credentials & Tools",
    icon: "award",
    skills: ["SolidWorks CSWA (Aug 2024)", "Microsoft Office"],
  },
];

// Category filter keys must match `category` on each project below.
const CATEGORIES = ["All", "Mechanical Design", "Robotics"];

/* Each project:
   id           - slug, used for anchors
   name, oneLiner, role, timeframe, category, tags
   status       - Notion "Write-up Status" (shown as a small badge for non-polished ones)
   featured     - bool
   media        - { type: 'photos'|'diagram', items: [...] } or null
   sections     - the 6-part body write-up, any can be omitted
   subProjects  - ids of other project entries that are components of this one;
                  each is shown as its own area on the parent's project page
   isSubProject - true if this should NOT get its own card/page (it only appears
                  as an area on its parent's page)
   media.videos - optional list of { src: "videos/x.mp4", poster?: "images/x.jpg", caption } shown
                  in a Videos section on the project page (works with any media type)
   hidePageDiagram - true to skip the diagram on the project page (card still shows it)
   focus        - optional on a photo item: CSS object-position for cropped views
                  (cards and gallery tiles), e.g. "50% 0%" keeps the top of the photo
   photoNeeds   - NOT rendered; a checklist of pictures still wanted for this project.
                  Add images to media.items as they arrive (images/<name>.png|jpg).
   Each project's page is project.html?id=<id>.
   Order in this array = order on the home page and in the prev/next pager.
*/
const PROJECTS = [
  {
    id: "zotbotics-arm",
    name: "ZOTBotics — Robot Arm",
    course: "UCI ZOTBotics Makerspace (ZIMS)",
    oneLiner: "Designed the hand/finger end-effector for a 3D-printed robotic arm that placed 1st of 14 teams in a live Rock-Paper-Scissors competition.",
    role: "Mechanical Designer: designed the hand/finger end-effector (solo). Arm built by the 6-person team.",
    timeframe: "Jan 2025 – May 2025",
    category: "Mechanical Design",
    tags: ["SolidWorks", "CAD", "3D Printing", "Tolerance Corrections"],
    status: "Draft Written",
    featured: true,
    media: {
      type: "photos",
      items: [
        { src: "images/zotbotics-arm.jpg", focus: "50% 0%", alt: "Assembled BCN3D Moveo robotic arm with 3D-printed hand end-effector, mounted on a demo stand", caption: "Assembled arm with the 3D-printed hand end-effector" },
        { src: "images/zotbotics-team.jpg", alt: "Six-person ZOTBotics team posing with the finished robotic arm after placing 1st", caption: "The team after placing 1st of 14 in the Rock-Paper-Scissors competition" },
        { src: "images/zotbotics-cad-1.jpg", alt: "SolidWorks CAD model of the robotic hand assembly, left dimetric view", caption: "CAD model of the hand assembly: left dimetric view" },
        { src: "images/zotbotics-cad-2.jpg", alt: "SolidWorks CAD model of the robotic hand assembly, right dimetric view", caption: "CAD model of the hand assembly: right dimetric view" },
        { src: "images/zotbotics-cad-3.jpg", alt: "CAD model of a fully assembled finger in the closed position, isometric view", caption: "Fully assembled finger, closed position (isometric)" },
        { src: "images/zotbotics-cad-4.jpg", alt: "CAD model of a fully assembled finger in the open position, isometric view", caption: "Fully assembled finger, open position (isometric)" },
      ],
    },
    photoNeeds: [
      "Original spool-and-thread design vs. the redesigned servo-horn design (CAD or photo)",
      "Close-up of the fingers actuating (rock / paper / scissors gestures)",
      "Action shot from the competition / final tournament",
      "Optional: the servo-horn slip fix, or the 20% to 15% infill comparison",
    ],
    sections: {
      problem: `As part of ZOTBotics' Introductory Makerspace (ZIMS) program at UC Irvine, I
        worked with a team of six over five months (January–May 2025) to design, 3D print, and
        assemble a BCN3D Moveo robotic arm with a hand/finger end-effector that could form rock,
        paper, and scissors gestures on a button press — which randomly generated the arm's move
        — and compete head-to-head against other teams.`,
      contribution: `I was the Mechanical Designer for the robotic hand: I designed the
        hand/finger end-effector on my own in SolidWorks and worked with the team to manufacture
        the rest of the arm. Through iterative CAD changes and assembly tolerance corrections I
        improved joint stability by an estimated ~25% (an estimate, not a measurement).`,
      approach: `I modeled the hand and finger assemblies in SOLIDWORKS and fabricated the
        components via 3D printing on Bambu A1 printers. The initial finger-actuation design used
        spools mounted on each servo to wind thread that opened and closed the fingers — one spool
        on the palm pulling the top two fingers down, a second spool behind the fingers pulling
        them back up, with the thread guided through small loops at the fingertips; the thumb used
        the same two-spool concept. That approach failed in practice: the servos only rotate 180°
        (not 360°), which wasn't enough range to wind and unwind the thread as designed. I
        scrapped the spool mechanism and redesigned around cross-shaped and straight servo horns,
        which successfully actuated the fingers within the servos' available range of motion.
        The team 3D printed and assembled the full arm, wired the stepper motors to their drivers,
        and ran an Arduino controller to execute the rock-paper-scissors gestures on a button
        press.`,
      challenges: `<ul>
          <li><strong>Spool-and-thread actuation didn't work</strong> — the servos' 180° range
            couldn't wind/unwind the thread as designed, so I redesigned the mechanism around
            cross-shaped and straight servo horns instead.</li>
          <li><strong>Servo horns slipped under load</strong> — the plastic horns didn't have
            teeth strong enough to grip the servo shaft. Fixed last-minute by securing the horns
            with super glue, which held through the competition; a metal horn with a clamping
            mechanism would be the more durable long-term fix.</li>
          <li><strong>Joint stability</strong> was improved by an estimated ~25% through iterative
            CAD modifications and assembly tolerance corrections. This is my estimate; I did not
            measure it.</li>
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
    id: "legged-walking-robot",
    name: "Legged Walking Robot — Mechanism Design to Team Build",
    course: "MAE 183, Computer-Aided Mechanical Design",
    oneLiner: "Carried a four-bar leg mechanism from kinematic design and simulated CAD through a physically built, team-fabricated 8-leg walking robot.",
    role: "Individual: leg-mechanism kinematics & CAD (sole designer). Team build: Team Member, wiring the electronics and assembling one leg mechanism.",
    timeframe: "Spring – Jun 2026",
    category: "Robotics",
    tags: ["CAD", "SolidWorks", "Simulation", "Arduino", "Manufacturing"],
    status: "Draft Written",
    featured: true,
    hidePageDiagram: true, // the diagram is the home-page card image only; the project page skips it
    media: { type: "diagram", key: "fourbar" },
    sections: {
      problem: `MAE 183 (computer-aided mechanical design) ran as a two-stage arc: first an
        individual sequence synthesizing and validating a four-bar leg linkage in GeoGebra and
        SolidWorks, then a ~6-person team project that took that same rectilinear-linkage concept
        and built it into a physically fabricated walking robot. Together they cover the path from
        planar kinematics to a driven physical prototype.`,
      contribution: `<strong>Individual coursework:</strong> sole designer — kinematic linkage
        synthesis in GeoGebra (comparing rectilinear, skew-pantograph, and pantograph foot-path
        variants off a Klann-type mechanism), then full CAD modeling and SolidWorks Motion
        Analysis of a quadruped walker built on the selected rectilinear linkage.<br><br>
        <strong>Team build ("Bear Walker"):</strong> Team Member. I wired the motor, battery, and
        Arduino/Bluetooth controller electronics and assembled one of the team's eight leg
        mechanisms; the team assembled the full robot together. The Arduino code was provided by
        the course professor.`,
      approach: `Started from planar four-bar linkage theory: modeled a Klann-type leg mechanism
        in GeoGebra as paired static/dynamic systems, compared three foot-path-generating
        variants, then selected and iterated the rectilinear linkage through a full redesign pass.
        Modeled the mechanism and a complete quadruped assembly in SolidWorks — gearmotor, spur
        gear reduction, links, bearings, and hardware — and validated the design in simulation
        with a Motion Analysis of forward, backward, and turning gait. The team then carried that
        linkage into a physical build: laser-cut wood legs and body panels, an Arduino-based
        controller (professor-provided code) with motor driver and Bluetooth module, and full
        electrical wiring. Subsystems were tested incrementally (one half of the assembly over
        Bluetooth) before full integration.`,
      challenges: `The first-pass leg linkage didn't produce the foot-path shape needed for a
        clean gait, so it was re-derived in GeoGebra and rebuilt in SolidWorks as a second
        iteration. On the team build, coordinating eight leg mechanisms on one shared drivetrain
        meant validating subsystems before full integration, and going from a CAD model to a
        physical robot meant wiring the motor, battery, and controller together — the part of a
        build that simulation doesn't exercise.`,
      results: `Delivered a path from validated planar kinematics through a simulated CAD assembly
        (individual) to a team-fabricated, physically built 8-leg walking robot with Bluetooth
        control (team), plus a SolidWorks Motion Analysis showing the quadruped's gait in
        simulation.`,
    },
    subProjects: ["quadruped-individual", "bear-walker-team"],
    photoNeeds: [
      "Optional overview shot: both robots side by side (Snorlax CAD + physical Bear Walker) for the top of the page",
    ],
  },
  {
    id: "quadrotor",
    name: "GPS-Denied Indoor Quadrotor (Build in Progress)",
    course: "Independent Project",
    oneLiner: "Building a 250 mm quadrotor intended for GPS-denied indoor navigation: custom CAD parts, a redesigned and FEA-compared 3D-printed prop guard, and a built airframe awaiting flight-controller bring-up.",
    role: "Independent Project Lead: component selection, full-assembly CAD, custom parts, prop-guard redesign and FEA, hardware build.",
    timeframe: "Sep 2026 – Present",
    category: "Robotics",
    tags: ["CAD", "SolidWorks", "FEA", "3D Printing"],
    status: "In Progress",
    featured: true,
    media: { type: "diagram", key: "quadrotor" },
    subProjects: ["quadrotor-prop-guard"],
    photoNeeds: [
      "SolidWorks render of the full 250mm airframe assembly",
      "Photos of the printed TPU 4-spoke prop guards and the vibration-isolated FC mount",
      "Photo of the assembled quadrotor in its current state",
      "A weighed (not CAD) mass of the printed v2 guard",
    ],
    sections: {
      problem: `GPS-based navigation fails in exactly the environments where autonomous systems
        are needed most — collapsed buildings, underground facilities, and dense indoor spaces
        relevant to search-and-rescue. This project is a 250 mm quadrotor intended to hold position
        and navigate indoors using only onboard sensors, no GPS.`,
      contribution: `Independent Project Lead on a solo build: component selection, full-assembly
        CAD in SolidWorks, a vibration-isolated flight-controller mount and 4-spoke TPU prop guards
        modeled from scratch, the prop-guard redesign and its FEA comparison, and building the
        hardware.`,
      approach: `<strong>Where it stands:</strong> the airframe is designed and built. The motors
        have not been run and the flight controller is not configured yet, so nothing has flown.
        <br><br><strong>Planned:</strong> an ArduPilot flight controller fusing IMU, optical-flow,
        and barometer readings, with a ROS 2 companion computer for mission planning. Neither is
        set up.<br><br><strong>Done so far is mechanical:</strong> custom parts modeled from
        scratch rather than sourced, and a prop guard redesigned, printed in TPU, and compared by
        FEA (see the component write-up below).`,
      challenges: `The printed v2 prop guard fits the frame after iterative tolerance
        corrections, but it is heavier than I want, so a lighter iteration is the next design
        step. Its mass numbers so far come from CAD, not a scale, and the FEA has not been checked
        against a physical test.`,
      results: `In progress. <strong>Done:</strong> airframe CAD, built hardware, and a prop-guard
        redesign from v1 to v2 that cut CAD mass 35.6% (77.1 g to 49.7 g), with an FEA stiffness
        comparison below. <strong>Not done:</strong> flight-controller configuration, running the
        motors, and any flight. <strong>Next:</strong> bring-up, a lighter guard iteration, and a
        physical deflection test of the printed guard.`,
    },
  },

  {
    id: "quadrotor-prop-guard",
    name: "Prop Guard Redesign and FEA (v1 to v2)",
    course: "Quadrotor component",
    isSubProject: true,
    parent: "quadrotor",
    oneLiner: "Redesigned the 3D-printed TPU prop guard to cut CAD mass 35.6%, then compared v1 and v2 with large-displacement FEA in SolidWorks Simulation.",
    role: "Solo: CAD, simulation setup, and analysis",
    timeframe: "Oct 2026",
    tags: ["CAD", "SolidWorks", "FEA", "3D Printing"],
    status: "In Progress",
    media: {
      type: "photos",
      items: [
        { src: "images/quadrotor-guard-v1-cad.jpg", alt: "SolidWorks isometric view of prop guard v1: a tall straight-sided duct wall with four spokes and a diamond-shaped motor mount", caption: "Prop guard v1: tall straight wall, 4 spokes, diamond motor mount (77.09 g)" },
        { src: "images/quadrotor-guard-v2-cad.jpg", alt: "SolidWorks isometric view of prop guard v2: a shorter duct wall with a lipped rim, four spokes, and a round motor mount", caption: "Prop guard v2: shorter wall with a lipped rim, 4 spokes, round motor mount (49.65 g)" },
        { src: "images/quadrotor-guard-v1-fea-disp-0p5N.jpg", alt: "SolidWorks Simulation displacement plot of prop guard v1 under a 0.5 N inward load on the rim between two spokes", caption: "v1 displacement under a 0.5 N inward load between two spokes (max 7.41 mm; deformation drawn at 2.4x)" },
        { src: "images/quadrotor-guard-v1-fea-stress-0p5N.jpg", alt: "SolidWorks Simulation von Mises stress plot of prop guard v1 under a 0.5 N load, with peak stress at the spoke roots near the hub", caption: "v1 von Mises stress, same load (peak about 0.37 MPa vs. 18 MPa yield)" },
        { src: "images/quadrotor-guard-v2-fea-disp-0p5N.jpg", alt: "SolidWorks Simulation displacement plot of prop guard v2 under a 0.5 N inward load on the rim between two spokes", caption: "v2 displacement under the same 0.5 N load (max 9.06 mm; true scale)" },
        { src: "images/quadrotor-guard-v2-fea-stress-0p5N.jpg", alt: "SolidWorks Simulation von Mises stress plot of prop guard v2 under a 0.5 N load, with peak stress at the spoke roots near the hub", caption: "v2 von Mises stress, same load (peak about 0.56 MPa). Legend scales differ between plots." },
      ],
    },
    sections: {
      problem: `A prop guard has to protect the propellers without adding weight the quadrotor
        has to carry. My first version (v1) worked but was heavy, so I redesigned it to cut mass,
        then needed a defensible way to see what the weight savings cost in stiffness.`,
      approach: `<strong>Design changes, v1 to v2:</strong> a much shorter duct wall, a lipped rim
        profile, filleted spoke-to-rim junctions, and a round motor-mount hub in place of the
        diamond one with slotted holes. Both versions keep four spokes.<br><br>
        <strong>FEA setup:</strong> SolidWorks Simulation static studies with large displacement
        on, TPU 95A as a linear-elastic material (E = 26 MPa, yield 18 MPa), the hub bolt holes
        and center bore fixed, and an inward force on a 10 x 10 mm patch of the rim halfway
        between two spokes, the least-supported spot and so the conservative case. The fixture,
        patch size, and loads are identical on both versions.`,
      challenges: `My first plan was a 40 N impact load, but the TPU guard is so compliant that the
        study gave unrealistically large displacements, and runs above 2 N hit solver convergence
        limits. I switched to small loads (0.5 to 2 N), turned on large-displacement analysis, and
        treat the 2 N runs as the edge of the reliable range. Peak stress also sits at the spoke
        roots next to the fixed hub holes, where fixtures create artificial hot spots, so I read
        stress along the spokes and have not yet run a mesh-convergence check.`,
      results: `<strong>Mass (CAD mass properties, not weighed):</strong> 77.09 g to 49.65 g
        (-35.6%). Volume -35.6%, surface area -29.3%.<br><br>
        <strong>FEA, max displacement / peak stress at the same load:</strong><br>
        0.5 N: v1 7.41 mm / 0.37 MPa &middot; v2 9.06 mm / 0.56 MPa<br>
        1 N: v1 17.90 mm / 0.90 MPa &middot; v2 23.15 mm / 1.33 MPa<br>
        2 N: v1 41.96 mm / 2.27 MPa &middot; v2 51.89 mm / 2.85 MPa<br><br>
        v2 is roughly 19 to 23% less stiff than v1 but 35.6% lighter, so stiffness per gram is
        about 20 to 27% better. Both guards soften as the load rises, and peak stress stays far
        below the 18 MPa yield strength at every load I ran.`,
      takeaways: `A linear-elastic model of a hyperelastic printed material is good for comparing
        two designs, not for predicting failure, so I am presenting these as design-to-design
        comparisons. The printed v2 fits the frame but still feels heavy, so I plan a lighter
        iteration next. A physical check is also planned: hang known weights on the rim of the
        printed guard and compare the measured deflection with the 7.4 mm (v1) and 9.1 mm (v2)
        predicted at 0.5 N.`,
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
        { src: "images/quadruped-snorlax-hero.jpg", alt: "Isometric SolidWorks render of the finished Snorlax-themed quadruped walking robot with purple rectilinear-linkage legs", caption: "Finished quadruped walker: isometric SolidWorks render" },
        { src: "images/quadruped-snorlax-cad.png", alt: "SolidWorks CAD assembly of the Snorlax-themed quadruped walking robot, showing two leg-linkage variants", caption: "SolidWorks CAD assembly of the Snorlax-themed quadruped walker" },
        { src: "images/quadruped-snorlax-bom.jpg", alt: "Complete parts list (bill of materials) for the quadruped leg mechanism", caption: "Complete parts list (BOM) for the leg mechanism" },
      ],
      videos: [
        { src: "videos/quadruped-v6-motion.mp4", poster: "videos/quadruped-v6-motion.jpg", caption: "SolidWorks Motion Analysis of the full quadruped gait cycle: forward, backward and turning" },
        { src: "videos/quadruped-v1-kinematic.mp4", poster: "videos/quadruped-v1-kinematic.jpg", caption: "Leg-linkage kinematic diagram: static vs. dynamic four-bar model in GeoGebra" },
        { src: "videos/quadruped-v2-redesigned.mp4", poster: "videos/quadruped-v2-redesigned.jpg", caption: "Redesigned linkage: the second GeoGebra iteration after the first foot path fell short" },
        { src: "videos/quadruped-v3-rectilinear.mp4", poster: "videos/quadruped-v3-rectilinear.jpg", caption: "Foot-path variant 1: rectilinear pantograph (the one I selected)" },
        { src: "videos/quadruped-v4-skew.mp4", poster: "videos/quadruped-v4-skew.jpg", caption: "Foot-path variant 2: skew pantograph" },
        { src: "videos/quadruped-v5-pantograph.mp4", poster: "videos/quadruped-v5-pantograph.jpg", caption: "Foot-path variant 3: pantograph linkage" },
      ],
    },
    photoNeeds: [
      "Closer shots of the gearmotor, spur gear reduction, and link details",
    ],
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
    oneLiner: "6-person MAE 183 team built a physical 8-leg rectilinear-linkage walking robot; I wired the electronics and assembled one leg mechanism.",
    role: "Team Member — wired the motor, battery, and Arduino/Bluetooth controller electronics; assembled one leg mechanism",
    timeframe: "Spring 2026",
    tags: ["Arduino", "Wiring", "Manufacturing"],
    status: "Draft Written",
    media: {
      type: "photos",
      items: [
        { src: "images/bear-walker-cad.png", alt: "CAD render of the Bear Walker's laser-cut leg mechanism and body panels", caption: "CAD assembly of the Bear Walker's leg mechanism" },
        { src: "images/bear-walker-manufactured.png", alt: "The fully fabricated, laser-cut wood Bear Walker robot held up for a photo", caption: "The fully fabricated Bear Walker, laser-cut and assembled" },
        { src: "images/bear-walker-team-photo.png", alt: "The MAE 183 team during final assembly, with robot parts on the table", caption: "The team during final assembly" },
      ],
    },
    photoNeeds: [
      "Electronics close-ups: Arduino, motor driver, Bluetooth module, battery, and wiring",
      "The half-assembly Bluetooth test",
      "The finished robot walking (photo or short clip/GIF), once the walking demonstration is confirmed",
      "The single leg mechanism you assembled",
    ],
    sections: {
      problem: `A ~6-person team took the rectilinear four-bar leg linkage concept and built it
        into a physically fabricated walking robot — laser-cut wood construction with
        Arduino + Bluetooth control. The Arduino code was provided by the course professor.`,
      contribution: `I wired the motor, battery, and Arduino/Bluetooth controller electronics and
        assembled one of the eight leg mechanisms. The team assembled the full robot together.`,
      results: `A team-fabricated, physically built 8-leg walking robot with Bluetooth control,
        with subsystems tested incrementally (one half of the assembly over Bluetooth) before
        full integration.`,
    },
  },
];
