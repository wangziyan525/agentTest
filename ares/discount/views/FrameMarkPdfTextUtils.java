import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * Framemark 模版生成 PDF 前的文本安全处理工具类。
 *
 * 使用方式：
 * 1. 普通文本字段：FrameMarkPdfTextUtils.sanitize(text)
 * 2. 模版链路会拼 HTML/XML：FrameMarkPdfTextUtils.sanitizeAndEscapeHtml(text)
 * 3. 模版数据是 Map/List：FrameMarkPdfTextUtils.sanitizeTemplateData(data)
 */
public final class FrameMarkPdfTextUtils {

    private static final Pattern CONTROL_CHARS =
            Pattern.compile("[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]");

    private static final Pattern ZERO_WIDTH_CHARS =
            Pattern.compile("[\\u200B\\u200C\\u200D\\u2060\\uFEFF]");

    private static final Pattern PRIVATE_USE_AREA =
            Pattern.compile("[\\uE000-\\uF8FF]");

    private static final Pattern SURROGATE_PAIRS =
            Pattern.compile("[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]");

    private FrameMarkPdfTextUtils() {
    }

    /**
     * 默认清洗：
     * 1. Unicode 归一化
     * 2. 去掉控制字符、零宽字符、私有区字符
     * 3. 替换异常空格和高风险符号
     * 4. 去掉 emoji / 代理对字符
     * 5. 压缩连续空白
     */
    public static String sanitize(String text) {
        if (text == null) {
            return "";
        }

        String value = Normalizer.normalize(text, Normalizer.Form.NFC);
        value = CONTROL_CHARS.matcher(value).replaceAll("");
        value = ZERO_WIDTH_CHARS.matcher(value).replaceAll("");
        value = PRIVATE_USE_AREA.matcher(value).replaceAll("");

        value = value
                .replace('\u00A0', ' ')
                .replace('\u3000', ' ')
                .replace('\t', ' ')
                .replace('\r', ' ')
                .replace('\n', ' ');

        value = replaceUnsafeSymbols(value);
        value = SURROGATE_PAIRS.matcher(value).replaceAll("");
        value = collapseSpaces(value);

        return value.trim();
    }

    /**
     * 如果模板最终会转成 HTML/XML，再做一层转义。
     */
    public static String sanitizeAndEscapeHtml(String text) {
        return escapeHtml(sanitize(text));
    }

    public static String escapeHtml(String text) {
        if (text == null) {
            return "";
        }

        StringBuilder sb = new StringBuilder(text.length() + 16);
        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            switch (ch) {
                case '&':
                    sb.append("&amp;");
                    break;
                case '<':
                    sb.append("&lt;");
                    break;
                case '>':
                    sb.append("&gt;");
                    break;
                case '"':
                    sb.append("&quot;");
                    break;
                case '\'':
                    sb.append("&#39;");
                    break;
                default:
                    sb.append(ch);
                    break;
            }
        }
        return sb.toString();
    }

    public static boolean hasUnsafeChars(String text) {
        if (text == null || text.isEmpty()) {
            return false;
        }
        return CONTROL_CHARS.matcher(text).find()
                || ZERO_WIDTH_CHARS.matcher(text).find()
                || PRIVATE_USE_AREA.matcher(text).find()
                || containsAstralCodePoint(text);
    }

    public static List<String> findUnsafeChars(String text) {
        List<String> result = new ArrayList<String>();
        if (text == null || text.isEmpty()) {
            return result;
        }

        for (int i = 0; i < text.length(); ) {
            int codePoint = text.codePointAt(i);
            if (isUnsafeCodePoint(codePoint)) {
                result.add(new String(Character.toChars(codePoint)));
            }
            i += Character.charCount(codePoint);
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    public static Object sanitizeTemplateData(Object value) {
        if (value == null) {
            return null;
        }

        if (value instanceof String) {
            return sanitize((String) value);
        }

        if (value instanceof Map) {
            Map<Object, Object> source = (Map<Object, Object>) value;
            Map<Object, Object> target = new LinkedHashMap<Object, Object>();
            for (Map.Entry<Object, Object> entry : source.entrySet()) {
                target.put(entry.getKey(), sanitizeTemplateData(entry.getValue()));
            }
            return target;
        }

        if (value instanceof Collection) {
            Collection<Object> source = (Collection<Object>) value;
            List<Object> target = new ArrayList<Object>(source.size());
            for (Object item : source) {
                target.add(sanitizeTemplateData(item));
            }
            return target;
        }

        return value;
    }

    private static String collapseSpaces(String text) {
        StringBuilder sb = new StringBuilder(text.length());
        boolean lastWasSpace = false;

        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            boolean isSpace = Character.isWhitespace(ch);
            if (isSpace) {
                if (!lastWasSpace) {
                    sb.append(' ');
                }
            } else {
                sb.append(ch);
            }
            lastWasSpace = isSpace;
        }

        return sb.toString();
    }

    private static String replaceUnsafeSymbols(String text) {
        return text
                .replace("✅", "已完成")
                .replace("✔", "已完成")
                .replace("❌", "未通过")
                .replace("✘", "未通过")
                .replace("→", "->")
                .replace("←", "<-")
                .replace("↑", "^")
                .replace("↓", "v")
                .replace("★", "*")
                .replace("☆", "*")
                .replace("•", "-")
                .replace("·", "-")
                .replace("“", "\"")
                .replace("”", "\"")
                .replace("‘", "'")
                .replace("’", "'");
    }

    private static boolean containsAstralCodePoint(String text) {
        for (int i = 0; i < text.length(); ) {
            int codePoint = text.codePointAt(i);
            if (codePoint > 0xFFFF) {
                return true;
            }
            i += Character.charCount(codePoint);
        }
        return false;
    }

    private static boolean isUnsafeCodePoint(int codePoint) {
        return (codePoint >= 0x00 && codePoint <= 0x08)
                || codePoint == 0x0B
                || codePoint == 0x0C
                || (codePoint >= 0x0E && codePoint <= 0x1F)
                || codePoint == 0x7F
                || codePoint == 0x200B
                || codePoint == 0x200C
                || codePoint == 0x200D
                || codePoint == 0x2060
                || codePoint == 0xFEFF
                || (codePoint >= 0xE000 && codePoint <= 0xF8FF)
                || codePoint > 0xFFFF;
    }

    public static void main(String[] args) {
        String raw = "测试\u200B文本 ✅ 含 emoji \uD83D\uDE00 和 异常空格";
        System.out.println("原始: " + raw);
        System.out.println("清洗: " + sanitize(raw));
        System.out.println("HTML: " + sanitizeAndEscapeHtml(raw));
        System.out.println("风险字符: " + findUnsafeChars(raw));
    }
}
