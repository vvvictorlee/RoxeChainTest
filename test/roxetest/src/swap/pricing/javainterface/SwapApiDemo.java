
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import javax.script.*;

public class SwapApiDemo {

   /**
    * 运行入口
    * @param args 运行参数
    */
   public static void main(String[] args) { testbuysell(); }

   public static void testbuysell() {
        String pool = "";
        try {
           pool = readJsonData("./pools.json");
           init(pool);
        } catch (IOException e) {
           e.getStackTrace();
        }
      double tokenAmountIn  = 1;
      double tokenAmountOut = 1;
      String tokenIn        = "BTC";
      String tokenOut       = "USD";
      query("sell", tokenAmountIn, tokenIn, tokenOut);
      query("buy", tokenAmountOut, tokenIn, tokenOut);
   }

   private static void showEngines() {
      // 构造一个脚本引擎管理器
      ScriptEngineManager manager = new ScriptEngineManager();
      // 遍历所有的引擎工厂，输出引擎工厂的信息
      for (ScriptEngineFactory factory : manager.getEngineFactories()) {
         String       engineName      = factory.getEngineName();
         String       engineVersion   = factory.getEngineVersion();
         String       languageName    = factory.getLanguageName();
         String       languageVersion = factory.getLanguageVersion();
         ScriptEngine engine          = factory.getScriptEngine();
         System.out.println(String.format(
             "引擎名称：%s\t引擎版本：%s\t语言名称：%s\t语言版本：%s\t", engineName, engineVersion, languageName,
             languageVersion));
         // 如果支持JavaScript
         if ("ECMAScript".equals(languageName)) {
            // callSimpleJavaScript(engine);
            // callJavaScriptFromFile(engine);
         }
      }
   }

   /**
    * 读取json文件并且转换成字符串
    * @param filePath文件的路径
    * @return
    * @throws IOException
    */
   public static String readJsonData(String pactFile) throws IOException {
      // 读取文件数据
      // System.out.println("读取文件数据util");

      StringBuffer strbuffer = new StringBuffer();
      File         myFile    = new File(pactFile); //"D:"+File.separatorChar+"DStores.json"
      if (!myFile.exists()) {
         System.err.println("Can't Find " + pactFile);
      }
      try {
         FileInputStream   fis               = new FileInputStream(pactFile);
         InputStreamReader inputStreamReader = new InputStreamReader(fis, "UTF-8");
         BufferedReader    in                = new BufferedReader(inputStreamReader);

         String str;
         while ((str = in.readLine()) != null) {
            strbuffer.append(str); // new String(str,"UTF-8")
         }
         in.close();
      } catch (IOException e) {
         e.getStackTrace();
      }
      // System.out.println("读取文件结束util");
      return strbuffer.toString();
   }

   /**
    * 从JavaScript文件执行JavaScript脚本
    * @param engine 脚本引擎
    */
   private static void init(String pool) {
      try {
         Invocable invoke = getEngine();
         if (null != invoke) {
            // 方式1 通过对象调用方法， 获取结果
            invoke.invokeFunction("init", pool);
         } else {
            System.err.println(" 不存在，无法执行脚本");
         }
      } catch (NoSuchMethodException | ScriptException e) {
         e.printStackTrace();
      }
   }

   /**
    * 从JavaScript文件执行JavaScript脚本
    * @param engine 脚本引擎
    */
   private static double query(String function, double amount, String tokenIn, String tokenOut) {
      double result = 0;
      try {
         Invocable invoke = getEngine();
         if (null != invoke) {
            // 方式1 通过对象调用方法， 获取结果
            Object c = invoke.invokeFunction(function, amount, tokenIn, tokenOut);
            System.out.println(c);
            Double d = Double.parseDouble(c.toString());
            result   = d == null ? 0 : d;
         } else {
            System.err.println(" 不存在，无法执行脚本");
         }
      } catch (NoSuchMethodException | ScriptException e) {
         e.printStackTrace();
      }

      return result;
   }

   static ScriptEngine engine = null;

   private static Invocable getEngine() {
      if (null != engine) {
         Invocable invoke = (Invocable)engine; // 调用方法，并传入两个参数
         return invoke;
      }

      try {
         ScriptEngineManager manager = new ScriptEngineManager();
         engine                      = manager.getEngineByName("ECMAScript");
         final String fileName       = "./swapapimin.js";
         File         file           = new File(fileName);
         if (file.exists()) {
            engine.eval(new FileReader(file));
            Invocable invoke = (Invocable)engine; // 调用方法，并传入两个参数
            return invoke;
         } else {
            System.err.println(fileName + " 不存在，无法执行脚本");
         }
      } catch (ScriptException | FileNotFoundException e) {
         e.printStackTrace();
      }

      return null;
   }
}