"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ParticleField } from "@/components/effects/particle-field"
import { HolographicCard } from "@/components/effects/holographic-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Syringe,
  Battery,
  Wifi,
  Heart,
  Volume2,
  Cpu,
  Shield,
  Smartphone,
  DollarSign,
  Package,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

// Bill of Materials with real components and pricing
const billOfMaterials = [
  {
    category: "Core Electronics",
    items: [
      {
        name: "Nordic nRF5340 SoC",
        description: "Dual-core Bluetooth 5.3 + Thread processor",
        quantity: 1,
        unitPrice: 8.5,
        supplier: "Nordic Semiconductor",
        partNumber: "NRF5340-QKAA-R7",
      },
      {
        name: "Quectel BG96 LTE Module",
        description: "Cat M1/NB1 cellular modem with GPS",
        quantity: 1,
        unitPrice: 18.0,
        supplier: "Quectel",
        partNumber: "BG96MA-128-SGN",
      },
      {
        name: "Maxim MAX30102",
        description: "Heart rate & SpO2 sensor",
        quantity: 1,
        unitPrice: 5.2,
        supplier: "Maxim Integrated",
        partNumber: "MAX30102EFD+T",
      },
      {
        name: "Bosch BME680",
        description: "Environmental sensor (temp, humidity, gas)",
        quantity: 1,
        unitPrice: 9.5,
        supplier: "Bosch",
        partNumber: "BME680",
      },
      {
        name: "STMicro LSM6DSO",
        description: "6-axis IMU (accelerometer + gyro)",
        quantity: 1,
        unitPrice: 3.8,
        supplier: "STMicroelectronics",
        partNumber: "LSM6DSOXTR",
      },
      {
        name: "Knowles SPH0645LM4H",
        description: "MEMS microphone",
        quantity: 1,
        unitPrice: 1.5,
        supplier: "Knowles",
        partNumber: "SPH0645LM4H-B",
      },
    ],
  },
  {
    category: "Power System",
    items: [
      {
        name: "Samsung INR21700-50E",
        description: "5000mAh Li-ion cell (modified form factor)",
        quantity: 1,
        unitPrice: 6.5,
        supplier: "Samsung SDI",
        partNumber: "INR21700-50E",
      },
      {
        name: "Texas Instruments BQ25895",
        description: "I2C controlled battery charger",
        quantity: 1,
        unitPrice: 3.2,
        supplier: "Texas Instruments",
        partNumber: "BQ25895RTWR",
      },
      {
        name: "Powerfilm SP3-37",
        description: "Flexible solar panel (3.6V, 22mA)",
        quantity: 1,
        unitPrice: 12.0,
        supplier: "PowerFilm Solar",
        partNumber: "SP3-37",
      },
      {
        name: "TEC1-12706",
        description: "Thermoelectric generator module",
        quantity: 1,
        unitPrice: 4.5,
        supplier: "Various",
        partNumber: "TEC1-12706",
      },
      {
        name: "Wurth 760308103",
        description: "Wireless charging coil",
        quantity: 1,
        unitPrice: 2.8,
        supplier: "Würth Elektronik",
        partNumber: "760308103",
      },
    ],
  },
  {
    category: "Display & Audio",
    items: [
      {
        name: 'BOE 1.4" AMOLED',
        description: "454x454 round display, 326 PPI",
        quantity: 1,
        unitPrice: 28.0,
        supplier: "BOE Technology",
        partNumber: "AV140ZPM-N00",
      },
      {
        name: "AAC S1510",
        description: "Miniature speaker (1W)",
        quantity: 1,
        unitPrice: 1.8,
        supplier: "AAC Technologies",
        partNumber: "S1510",
      },
      {
        name: "Linear resonant actuator",
        description: "Haptic feedback motor",
        quantity: 1,
        unitPrice: 2.5,
        supplier: "Jinlong Machinery",
        partNumber: "Z4TL2B1561882",
      },
    ],
  },
  {
    category: "Naloxone Delivery System",
    items: [
      {
        name: "Custom micro-injector mechanism",
        description: "Spring-loaded auto-injection assembly",
        quantity: 1,
        unitPrice: 45.0,
        supplier: "Custom Manufacturing",
        partNumber: "NG2-INJ-001",
      },
      {
        name: "Naloxone cartridge housing",
        description: "Medical-grade polymer cartridge",
        quantity: 1,
        unitPrice: 8.0,
        supplier: "Custom Manufacturing",
        partNumber: "NG2-CART-001",
      },
      {
        name: "Stepper motor (NEMA 8)",
        description: "Precision injection motor",
        quantity: 1,
        unitPrice: 12.0,
        supplier: "Oriental Motor",
        partNumber: "PKP213D05A",
      },
      {
        name: "Force sensor",
        description: "Skin contact detection",
        quantity: 1,
        unitPrice: 4.5,
        supplier: "Interlink Electronics",
        partNumber: "FSR 400",
      },
    ],
  },
  {
    category: "Enclosure & Assembly",
    items: [
      {
        name: "Titanium Grade 5 case",
        description: "CNC machined watch body",
        quantity: 1,
        unitPrice: 35.0,
        supplier: "Custom CNC",
        partNumber: "NG2-CASE-TI5",
      },
      {
        name: "Sapphire crystal",
        description: "Scratch-resistant display cover",
        quantity: 1,
        unitPrice: 15.0,
        supplier: "Swiss Jewel",
        partNumber: "SJ-SAP-40",
      },
      {
        name: "Medical silicone strap",
        description: "Hypoallergenic, sensor-integrated band",
        quantity: 1,
        unitPrice: 8.0,
        supplier: "Custom Manufacturing",
        partNumber: "NG2-STRAP-001",
      },
      {
        name: "Waterproof gaskets",
        description: "IP68 rated sealing",
        quantity: 1,
        unitPrice: 2.0,
        supplier: "Various",
        partNumber: "NG2-SEAL-001",
      },
      {
        name: "PCB assembly",
        description: "6-layer HDI board with components",
        quantity: 1,
        unitPrice: 25.0,
        supplier: "JLCPCB",
        partNumber: "NG2-PCB-001",
      },
    ],
  },
]

// Calculate totals
const calculateBOMTotal = () => {
  let total = 0
  billOfMaterials.forEach((category) => {
    category.items.forEach((item) => {
      total += item.quantity * item.unitPrice
    })
  })
  return total
}

const componentBOMTotal = calculateBOMTotal()
const assemblyLabor = 25.0
const qualityTesting = 15.0
const packaging = 5.0
const naloxoneCartridge = 45.0 // Pre-filled naloxone not included in hardware
const totalPerUnit = componentBOMTotal + assemblyLabor + qualityTesting + packaging

export default function NG2WatchPage() {
  const [rotation, setRotation] = useState({ x: -20, y: 30 })
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Interactive 3D rotation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 60
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 60
    setRotation({ x: -x, y })
  }

  // Watch component positions for interactive blueprint
  const watchComponents = [
    {
      id: "display",
      name: "AMOLED Display",
      x: 50,
      y: 50,
      color: "#FF851B",
      description: '1.4" 454x454 round display with AR overlay capability',
    },
    {
      id: "naloxone",
      name: "Naloxone Cartridge",
      x: 85,
      y: 50,
      color: "#FF4136",
      description: "Replaceable auto-injection module with 4mg naloxone",
    },
    {
      id: "battery",
      name: "Battery Module",
      x: 15,
      y: 50,
      color: "#B10DC9",
      description: "5000mAh removable battery with 7-day life",
    },
    {
      id: "solar",
      name: "Solar Panel",
      x: 50,
      y: 15,
      color: "#2ECC40",
      description: "Integrated solar charging extends battery life",
    },
    {
      id: "speaker",
      name: "Emergency Speaker",
      x: 50,
      y: 85,
      color: "#FFDC00",
      description: "95dB alarm for emergency alerts",
    },
    {
      id: "sensors",
      name: "Health Sensors",
      x: 30,
      y: 75,
      color: "#0074D9",
      description: "SpO2, heart rate, temperature monitoring",
    },
    {
      id: "esim",
      name: "eSIM Module",
      x: 70,
      y: 25,
      color: "#39CCCC",
      description: "Cellular connectivity for Lifeline & Hero Network",
    },
    {
      id: "cpu",
      name: "Nordic SoC",
      x: 30,
      y: 30,
      color: "#01FF70",
      description: "Dual-core processor with AI overdose detection",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleField count={80} />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="outline" className="glass neon-border bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold glow-text font-[family-name:var(--font-orbitron)]">NG2 WATCH BLUEPRINT</h1>
          <a href="https://gofund.me/9acf270ea" target="_blank" rel="noopener noreferrer">
            <Button className="bg-green-500 hover:bg-green-600">
              <DollarSign className="w-4 h-4 mr-2" />
              Fund This Project
            </Button>
          </a>
        </header>

        {/* Hero Product Showcase */}
        <section className="mb-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl overflow-hidden neon-border">
            <img src="/images/ng2-watch-hero.jpg" alt="NarcoGuard NG2 Auto-Injection Watch on wrist showing vital signs" className="w-full h-auto object-cover" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden neon-border flex-1">
              <img src="/images/ng2-exploded-view.jpg" alt="NG2 Watch exploded engineering view showing all internal components" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden neon-border flex-1">
              <img src="/images/ng2-blueprint.jpg" alt="NG2 Watch engineering blueprint with cross-section and dimensions" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Funding CTA Banner */}
        <section className="mb-8 p-6 rounded-2xl neon-border bg-gradient-to-r from-green-500/20 via-primary/10 to-green-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Help Us Build 80 Life-Saving Watches</h2>
              <p className="text-muted-foreground mt-1">Each NG2 watch costs ${(totalPerUnit + naloxoneCartridge).toFixed(2)} to produce. Your donation directly funds real hardware that saves real lives in Broome County, NY.</p>
            </div>
            <div className="flex gap-3">
              <a href="https://gofund.me/9acf270ea" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Donate Now
                </Button>
              </a>
              <a href="mailto:narcoguard607@gmail.com">
                <Button size="lg" variant="outline" className="neon-border bg-transparent">
                  Partner With Us
                </Button>
              </a>
            </div>
          </div>
        </section>

        <Tabs defaultValue="3d-view" className="space-y-6">
          <TabsList className="grid grid-cols-4 glass neon-border">
            <TabsTrigger value="3d-view">3D View</TabsTrigger>
            <TabsTrigger value="blueprint">Blueprint</TabsTrigger>
            <TabsTrigger value="bom">Bill of Materials</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
          </TabsList>

          {/* 3D Interactive View */}
          <TabsContent value="3d-view">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HolographicCard className="p-6" glowIntensity="high">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Syringe className="w-5 h-5 text-primary" />
                  Interactive 3D Model
                </h2>

                {/* 3D Watch Viewer */}
                <div
                  ref={containerRef}
                  className="relative aspect-square bg-gradient-to-br from-background to-primary/10 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing neon-border"
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                  onMouseMove={handleMouseMove}
                >
                  {/* 3D Watch Render */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-100"
                    style={{
                      transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Watch Body */}
                    <div className="relative w-64 h-64">
                      {/* Main case */}
                      <div
                        className="absolute inset-4 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-2xl neon-border"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        {/* Display */}
                        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center overflow-hidden">
                          <div className="text-center">
                            <Heart className="w-8 h-8 text-red-500 mx-auto heartbeat" />
                            <p className="text-2xl font-bold mt-2">98 BPM</p>
                            <p className="text-xs text-muted-foreground">SpO2: 98%</p>
                          </div>
                          {/* Scan line effect */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-pulse" />
                        </div>
                      </div>

                      {/* Naloxone cartridge indicator */}
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-16 bg-gradient-to-r from-red-600 to-red-500 rounded-r-lg pulse-glow"
                        style={{ transform: "translateZ(25px) translateX(10px)" }}
                      >
                        <Syringe className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
                      </div>

                      {/* Solar panel ring */}
                      <div
                        className="absolute inset-0 rounded-full border-4 border-green-500/50"
                        style={{ transform: "translateZ(22px)" }}
                      />

                      {/* Crown/button */}
                      <div
                        className="absolute right-0 top-1/3 w-3 h-8 bg-gradient-to-r from-zinc-600 to-zinc-500 rounded-r"
                        style={{ transform: "translateZ(15px) translateX(5px)" }}
                      />

                      {/* Strap connectors */}
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-zinc-800 rounded-t-lg"
                        style={{ transform: "translateZ(10px) translateY(-10px)" }}
                      />
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-zinc-800 rounded-b-lg"
                        style={{ transform: "translateZ(10px) translateY(10px)" }}
                      />
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass bg-transparent"
                      onClick={() => setRotation({ x: -20, y: 30 })}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass bg-transparent"
                      onClick={() => setZoom((z) => Math.min(z + 0.2, 2))}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass bg-transparent"
                      onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="absolute bottom-4 right-4 text-xs text-muted-foreground">Drag to rotate</p>
                </div>
              </HolographicCard>

              {/* Features List */}
              <div className="space-y-4">
                <HolographicCard className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    Key Features
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: Syringe,
                        color: "text-red-500",
                        title: "Auto-Injection",
                        desc: "4mg naloxone deployed in < 3 seconds",
                      },
                      {
                        icon: Heart,
                        color: "text-pink-500",
                        title: "Vitals Monitoring",
                        desc: "24/7 heart rate, SpO2, respiratory tracking",
                      },
                      {
                        icon: Wifi,
                        color: "text-blue-500",
                        title: "Always Connected",
                        desc: "eSIM with Lifeline & Hero Network",
                      },
                      {
                        icon: Battery,
                        color: "text-purple-500",
                        title: "7-Day Battery",
                        desc: "Solar + kinetic + wireless charging",
                      },
                      {
                        icon: Volume2,
                        color: "text-yellow-500",
                        title: "95dB Alarm",
                        desc: "Emergency alert to nearby responders",
                      },
                      {
                        icon: Cpu,
                        color: "text-green-500",
                        title: "AI Detection",
                        desc: "Kalman filtering for overdose patterns",
                      },
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                        <div>
                          <p className="font-semibold text-sm">{feature.title}</p>
                          <p className="text-xs text-muted-foreground">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </HolographicCard>

                <HolographicCard className="p-6 bg-gradient-to-r from-green-500/10 to-primary/10">
                  <h3 className="font-bold text-lg mb-2">Unit Cost Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Components</span>
                      <span className="font-mono">${componentBOMTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assembly Labor</span>
                      <span className="font-mono">${assemblyLabor.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>QA Testing</span>
                      <span className="font-mono">${qualityTesting.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Packaging</span>
                      <span className="font-mono">${packaging.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-primary/30 pt-2 flex justify-between font-bold">
                      <span>Hardware Total</span>
                      <span className="font-mono text-primary">${totalPerUnit.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>+ Naloxone Cartridge</span>
                      <span className="font-mono">${naloxoneCartridge.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-primary/30 pt-2 flex justify-between font-bold text-lg">
                      <span>Complete Unit</span>
                      <span className="font-mono text-green-500">${(totalPerUnit + naloxoneCartridge).toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    * Volume pricing at 1000+ units. Individual units may vary.
                  </p>
                </HolographicCard>
              </div>
            </div>
          </TabsContent>

          {/* Interactive Blueprint */}
          <TabsContent value="blueprint">
            <HolographicCard className="p-6" glowIntensity="medium">
              <h2 className="text-xl font-bold mb-6 text-center">Interactive Component Blueprint</h2>

              <div className="relative aspect-square max-w-2xl mx-auto bg-gradient-to-br from-zinc-900 to-background rounded-full neon-border overflow-hidden">
                {/* Watch outline */}
                <div className="absolute inset-8 rounded-full border-2 border-zinc-700" />
                <div className="absolute inset-16 rounded-full border border-zinc-800" />

                {/* Interactive components */}
                {watchComponents.map((comp) => (
                  <button
                    key={comp.id}
                    className={`absolute w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 ${
                      selectedComponent === comp.id ? "ring-4 ring-white scale-125" : ""
                    }`}
                    style={{
                      left: `${comp.x}%`,
                      top: `${comp.y}%`,
                      transform: "translate(-50%, -50%)",
                      backgroundColor: comp.color,
                      boxShadow: `0 0 20px ${comp.color}80`,
                    }}
                    onClick={() => setSelectedComponent(selectedComponent === comp.id ? null : comp.id)}
                  >
                    <span className="text-xs font-bold text-white">{comp.id.slice(0, 2).toUpperCase()}</span>
                  </button>
                ))}

                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-2xl font-bold glow-text">NG2</p>
                    <p className="text-xs text-muted-foreground">NARCOGUARD</p>
                  </div>
                </div>
              </div>

              {/* Component details */}
              {selectedComponent && (
                <div className="mt-6 p-4 rounded-lg bg-background/50 neon-border max-w-md mx-auto">
                  {watchComponents
                    .filter((c) => c.id === selectedComponent)
                    .map((comp) => (
                      <div key={comp.id}>
                        <h3 className="font-bold text-lg" style={{ color: comp.color }}>
                          {comp.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">{comp.description}</p>
                      </div>
                    ))}
                </div>
              )}

              {/* Legend */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {watchComponents.map((comp) => (
                  <div
                    key={comp.id}
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-all ${
                      selectedComponent === comp.id ? "bg-primary/20" : "hover:bg-background/50"
                    }`}
                    onClick={() => setSelectedComponent(selectedComponent === comp.id ? null : comp.id)}
                  >
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: comp.color }} />
                    <span className="text-xs">{comp.name}</span>
                  </div>
                ))}
              </div>
            </HolographicCard>
          </TabsContent>

          {/* Bill of Materials */}
          <TabsContent value="bom">
            <div className="space-y-6">
              {billOfMaterials.map((category, catIndex) => (
                <HolographicCard key={catIndex} className="p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    {category.category}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-primary/30">
                          <th className="text-left py-2">Component</th>
                          <th className="text-left py-2 hidden md:table-cell">Description</th>
                          <th className="text-center py-2">Qty</th>
                          <th className="text-right py-2">Unit Price</th>
                          <th className="text-right py-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.items.map((item, i) => (
                          <tr key={i} className="border-b border-background/50 hover:bg-background/30">
                            <td className="py-3">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground md:hidden">{item.description}</p>
                              <p className="text-xs text-primary">{item.partNumber}</p>
                            </td>
                            <td className="py-3 hidden md:table-cell text-muted-foreground">{item.description}</td>
                            <td className="py-3 text-center">{item.quantity}</td>
                            <td className="py-3 text-right font-mono">${item.unitPrice.toFixed(2)}</td>
                            <td className="py-3 text-right font-mono font-bold">
                              ${(item.quantity * item.unitPrice).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-right">
                    <span className="text-muted-foreground">Category Total: </span>
                    <span className="font-mono font-bold text-primary">
                      ${category.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0).toFixed(2)}
                    </span>
                  </div>
                </HolographicCard>
              ))}

              {/* Grand Total */}
              <HolographicCard className="p-6 bg-gradient-to-r from-green-500/20 to-primary/20" glowIntensity="high">
                <h3 className="text-xl font-bold mb-4">Production Cost Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-background/50">
                    <p className="text-sm text-muted-foreground">Components</p>
                    <p className="text-2xl font-bold font-mono">${componentBOMTotal.toFixed(2)}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50">
                    <p className="text-sm text-muted-foreground">Labor & QA</p>
                    <p className="text-2xl font-bold font-mono">${(assemblyLabor + qualityTesting).toFixed(2)}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50">
                    <p className="text-sm text-muted-foreground">Packaging</p>
                    <p className="text-2xl font-bold font-mono">${packaging.toFixed(2)}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/20 neon-border">
                    <p className="text-sm text-muted-foreground">Per Unit Total</p>
                    <p className="text-2xl font-bold font-mono text-green-500">${totalPerUnit.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-background/30">
                  <h4 className="font-bold mb-2">Funding Goal: 80 Watches for Broome County</h4>
                  <div className="flex items-center justify-between">
                    <span>80 units × ${(totalPerUnit + naloxoneCartridge).toFixed(2)}</span>
                    <span className="text-2xl font-bold text-green-500">
                      ${((totalPerUnit + naloxoneCartridge) * 80).toFixed(2)}
                    </span>
                  </div>
                  <a href="https://gofund.me/9acf270ea" target="_blank" rel="noopener noreferrer" className="block mt-4">
                    <Button className="w-full bg-green-500 hover:bg-green-600" size="lg">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Support This Project on GoFundMe
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </HolographicCard>
            </div>
          </TabsContent>

          {/* Technical Specifications */}
          <TabsContent value="specs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HolographicCard className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  Processing & Connectivity
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    ["Processor", "Nordic nRF5340 Dual-core (64MHz + 128MHz)"],
                    ["Memory", "1MB Flash, 512KB RAM"],
                    ["Bluetooth", "5.3 LE with Thread support"],
                    ["Cellular", "LTE Cat M1/NB1 (Quectel BG96)"],
                    ["GPS", "Integrated GNSS (GPS, GLONASS, Galileo)"],
                    ["Wi-Fi", "2.4GHz 802.11 b/g/n"],
                    ["NFC", "For emergency ID and pairing"],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-background/50">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </HolographicCard>

              <HolographicCard className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Health Sensors
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    ["Heart Rate", "Optical PPG (MAX30102), ±1 BPM"],
                    ["SpO2", "Blood oxygen saturation, ±2%"],
                    ["Respiratory Rate", "Derived from PPG waveform"],
                    ["Skin Temperature", "Infrared thermopile, ±0.1°C"],
                    ["Motion", "6-axis IMU (LSM6DSO)"],
                    ["Fall Detection", "AI-based sudden impact analysis"],
                    ["Skin Contact", "Capacitive + force sensor"],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-background/50">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </HolographicCard>

              <HolographicCard className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Battery className="w-5 h-5 text-purple-500" />
                  Power System
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    ["Battery Capacity", "500mAh Li-Polymer"],
                    ["Battery Life", "7 days typical use"],
                    ["Solar Charging", "10% daily top-up in sunlight"],
                    ["Thermoelectric", "Body heat energy harvesting"],
                    ["Wireless Charging", "Qi compatible (5W)"],
                    ["USB-C", "Fast charge (0-100% in 90 min)"],
                    ["Emergency Reserve", "4-hour low-power mode"],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-background/50">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </HolographicCard>

              <HolographicCard className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Syringe className="w-5 h-5 text-red-500" />
                  Naloxone Delivery
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    ["Dosage", "4mg naloxone hydrochloride"],
                    ["Delivery Method", "Subcutaneous auto-injection"],
                    ["Injection Time", "< 3 seconds from trigger"],
                    ["Cartridge Life", "24 months sealed"],
                    ["Replacement", "Easy snap-in cartridge swap"],
                    ["Activation", "Auto (vitals) or manual button"],
                    ["Depth", "4mm subcutaneous needle"],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-background/50">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </HolographicCard>

              <HolographicCard className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-blue-500" />
                  Display & Audio
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    ["Display", '1.4" AMOLED, 454x454 (326 PPI)'],
                    ["Touch", "Capacitive with wet-finger support"],
                    ["Glass", "Sapphire crystal (9H hardness)"],
                    ["Speaker", "1W, 95dB emergency alarm"],
                    ["Microphone", "MEMS with noise cancellation"],
                    ["Haptics", "Linear resonant actuator"],
                    ["AR Overlay", "Guardian AI visual prompts"],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-background/50">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </HolographicCard>

              <HolographicCard className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Physical Specs
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    ["Case Material", "Grade 5 Titanium"],
                    ["Dimensions", "46mm × 46mm × 14mm"],
                    ["Weight", "68g (with cartridge)"],
                    ["Water Resistance", "IP68 (5ATM)"],
                    ["Operating Temp", "-20°C to +55°C"],
                    ["Strap", "Medical-grade silicone"],
                    ["Colors", "Black, Silver, Rose Gold"],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-background/50">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </HolographicCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
