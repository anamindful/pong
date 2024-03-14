package pingpong.demo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GameController {

    @GetMapping("/")
    public String index() {
        return "index"; // Return the name of the HTML template (e.g., index.html)
    }
}

