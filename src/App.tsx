import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Moon, 
  Sun, 
  Sparkles, 
  User, 
  Calendar as CalendarIcon, 
  Heart, 
  ChevronLeft, 
  Loader2,
  Info,
  Star,
  Zap,
  Shield
} from 'lucide-react';
import { calculateAbjad, getElementByAbjad } from '@/src/lib/abjad';
import { getZodiacInfo, ZodiacInfo } from '@/src/lib/astrology';
import { getSpiritualAnalysis } from '@/src/lib/geminiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function App() {
  const [name, setName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [dob, setDob] = useState('');
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    abjadName: number;
    abjadMother: number;
    totalAbjad: number;
    zodiac: ZodiacInfo;
    element: string;
    analysis: string;
  } | null>(null);

  const handleCalculate = async () => {
    if (!name || !motherName || !dob) return;

    setLoading(true);
    const abName = calculateAbjad(name);
    const abMother = calculateAbjad(motherName);
    const total = abName + abMother;
    const zod = getZodiacInfo(new Date(dob));
    const elem = getElementByAbjad(total);

    const analysis = await getSpiritualAnalysis({
      name,
      motherName,
      dob,
      abjadName: abName,
      abjadMother: abMother,
      zodiac: zod.urduSign,
      element: elem,
      purpose
    });

    setResult({
      abjadName: abName,
      abjadMother: abMother,
      totalAbjad: total,
      zodiac: zod,
      element: elem,
      analysis
    });
    setLoading(false);
  };

  const reset = () => {
    setResult(null);
    setName('');
    setMotherName('');
    setDob('');
    setPurpose('');
  };

  return (
    <div className="min-h-screen mystical-bg text-foreground p-4 md:p-8 flex flex-col items-center relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: Math.random()
            }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 3 + Math.random() * 4, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16 relative z-10"
      >
        <div className="flex justify-center mb-6">
          <motion.div 
            className="relative"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Moon className="w-20 h-20 text-primary gold-glow fill-primary/10" />
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4"
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
          </motion.div>
        </div>
        <h1 className="nastaliq text-6xl md:text-7xl font-bold text-gradient-gold mb-4 drop-shadow-lg">روحانی عامل</h1>
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-4 opacity-50" />
        <p className="text-accent text-xl max-w-lg mx-auto leading-relaxed nastaliq">
          قدیم علوم، ابجد اور ستاروں کی چال سے اپنی زندگی کے مخفی پہلوؤں کو جانیے
        </p>
      </motion.header>

      <main className="w-full max-w-5xl relative z-10">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="input-form"
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-card border-none shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                <CardHeader className="text-center pb-8 pt-10">
                  <CardTitle className="nastaliq text-4xl text-accent mb-2 gold-glow">سائل کی تفصیلات</CardTitle>
                  <CardDescription className="text-lg text-accent/80 nastaliq">درست تشخیص کے لیے مکمل اور صحیح معلومات فراہم کریں</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 px-6 md:px-12 pb-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div className="space-y-3" whileFocus={{ scale: 1.02 }}>
                      <Label htmlFor="name" className="text-lg flex items-center gap-3 text-accent nastaliq">
                        <div className="p-2 bg-accent/10 rounded-full"><User className="w-5 h-5" /></div>
                        سائل کا نام (اردو)
                      </Label>
                      <Input 
                        id="name" 
                        placeholder="نام یہاں لکھیں..." 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-14 text-xl bg-black/40 border-accent/50 focus:border-accent transition-all text-right nastaliq text-accent"
                      />
                    </motion.div>
                    <motion.div className="space-y-3" whileFocus={{ scale: 1.02 }}>
                      <Label htmlFor="motherName" className="text-lg flex items-center gap-3 text-accent nastaliq">
                        <div className="p-2 bg-accent/10 rounded-full"><Heart className="w-5 h-5" /></div>
                        والدہ کا نام (اردو)
                      </Label>
                      <Input 
                        id="motherName" 
                        placeholder="والدہ کا نام لکھیں..." 
                        value={motherName}
                        onChange={(e) => setMotherName(e.target.value)}
                        className="h-14 text-xl bg-black/40 border-accent/50 focus:border-accent transition-all text-right nastaliq text-accent"
                      />
                    </motion.div>
                  </div>

                  <motion.div className="space-y-3" whileFocus={{ scale: 1.02 }}>
                    <Label htmlFor="dob" className="text-lg flex items-center gap-3 text-accent nastaliq">
                      <div className="p-2 bg-accent/10 rounded-full"><CalendarIcon className="w-5 h-5" /></div>
                      تاریخ پیدائش
                    </Label>
                    <Input 
                      id="dob" 
                      type="date" 
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="h-14 text-xl bg-black/40 border-accent/50 focus:border-accent transition-all [color-scheme:dark] text-accent"
                    />
                  </motion.div>

                  <motion.div className="space-y-3" whileFocus={{ scale: 1.01 }}>
                    <Label htmlFor="purpose" className="text-lg flex items-center gap-3 text-accent nastaliq">
                      <div className="p-2 bg-accent/10 rounded-full"><Sparkles className="w-5 h-5" /></div>
                      آپ کا سوال یا مقصد (مرض، پریشانی، یا کوئی خاص کام)
                    </Label>
                    <textarea 
                      id="purpose" 
                      placeholder="اپنی پریشانی یا مقصد یہاں تفصیل سے لکھیں..." 
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full min-h-[120px] p-4 text-xl bg-black/40 border border-accent/50 rounded-lg focus:border-accent focus:ring-1 focus:ring-accent transition-all text-right nastaliq text-accent resize-none"
                    />
                  </motion.div>
                </CardContent>
                <CardFooter className="px-6 md:px-12 pb-12">
                  <Button 
                    onClick={handleCalculate} 
                    disabled={loading || !name || !motherName || !dob}
                    className="w-full h-16 text-2xl font-bold bg-primary hover:bg-primary/80 text-primary-foreground transition-all duration-500 shadow-2xl shadow-primary/30 group relative overflow-hidden border border-accent/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {loading ? (
                      <div className="flex items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <span className="nastaliq">حساب جاری ہے...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <Sparkles className="h-8 w-8" />
                        <span className="nastaliq">روحانی تشخیص شروع کریں</span>
                      </div>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="result-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                <Button variant="ghost" onClick={reset} className="text-accent hover:text-accent/80 hover:bg-accent/10 text-lg h-12 px-6 nastaliq">
                  <ChevronLeft className="ml-2 h-5 w-5" />
                  دوبارہ چیک کریں
                </Button>
                <h2 className="nastaliq text-4xl text-gradient-gold gold-glow">روحانی تشخیص کا نتیجہ</h2>
              </div>

              {/* Stats Grid - Bento Style */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Abjad Stats */}
                <Card className="md:col-span-4 glass-card glass-card-hover border-none">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-medium flex items-center gap-3 text-accent nastaliq">
                      <div className="p-2 bg-accent/10 rounded-lg"><Zap className="w-5 h-5" /></div>
                      علم الاعداد (ابجد)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-lg nastaliq">نام کے اعداد:</span>
                      <span className="font-bold text-accent text-2xl">{result.abjadName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-lg nastaliq">والدہ کے اعداد:</span>
                      <span className="font-bold text-accent text-2xl">{result.abjadMother}</span>
                    </div>
                    <Separator className="bg-white/5" />
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-muted-foreground text-lg font-bold nastaliq">کل اعداد:</span>
                      <div className="relative">
                        <div className="absolute inset-0 bg-accent/20 blur-lg rounded-full" />
                        <span className="relative font-bold text-accent text-4xl drop-shadow-sm">{result.totalAbjad}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Zodiac Stats */}
                <Card className="md:col-span-5 glass-card glass-card-hover border-none">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-medium flex items-center gap-3 text-accent nastaliq">
                      <div className="p-2 bg-accent/10 rounded-lg"><Star className="w-5 h-5" /></div>
                      علم نجوم (برج)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-lg nastaliq">آپ کا برج:</span>
                      <Badge className="bg-accent/20 text-accent border-accent/30 text-xl py-1 px-4 nastaliq">
                        {result.zodiac.urduSign}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-lg nastaliq">حاکم ستارہ:</span>
                      <span className="font-bold text-accent text-2xl nastaliq">{result.zodiac.urduPlanet}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-lg nastaliq">عنصر:</span>
                      <span className="font-bold text-accent text-2xl nastaliq">{result.zodiac.urduElement}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Element Stats */}
                <Card className="md:col-span-3 glass-card glass-card-hover border-none">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-medium flex items-center gap-3 text-accent nastaliq">
                      <div className="p-2 bg-accent/10 rounded-lg"><Shield className="w-5 h-5" /></div>
                      مزاج
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center pt-4">
                    <div className="text-center">
                      <div className="text-muted-foreground text-lg mb-2 nastaliq">آپ کی طبیعت:</div>
                      <div className="nastaliq text-4xl text-accent font-bold gold-glow">{result.element}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Analysis Report */}
              <Card className="glass-card border-none overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                <CardHeader className="bg-black/20 border-b border-white/5 py-8">
                  <CardTitle className="nastaliq text-4xl text-gradient-gold text-center gold-glow">تفصیلی روحانی رپورٹ</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[600px] p-8 md:p-12">
                    <div className="prose prose-invert max-w-none">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="whitespace-pre-wrap leading-[2.8] text-xl text-right text-accent nastaliq"
                      >
                        {result.analysis}
                      </motion.div>
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="bg-black/20 border-t border-white/5 justify-center py-8 gap-6">
                  <Button 
                    variant="outline" 
                    onClick={() => window.print()} 
                    className="h-14 px-8 border-accent/30 text-accent hover:bg-accent/10 text-xl nastaliq"
                  >
                    رپورٹ پرنٹ کریں
                  </Button>
                  <Button 
                    onClick={reset}
                    className="h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/80 text-xl nastaliq border border-accent/20"
                  >
                    نیا حساب کریں
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="mt-20 mb-10 text-center relative z-10">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-3 px-6 py-3 bg-black/30 rounded-full border border-white/10 backdrop-blur-sm">
            <Info className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground text-lg nastaliq">نوٹ: یہ ایپ صرف روحانی رہنمائی کے لیے ہے، حتمی فیصلہ اللہ تعالیٰ کے ہاتھ میں ہے۔</span>
          </div>
          <p className="text-muted-foreground/40 text-sm tracking-widest uppercase nastaliq">© 2026 روحانی عامل - تمام حقوق محفوظ ہیں</p>
        </div>
      </footer>
    </div>
  );
}
