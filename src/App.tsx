import Container from "./components/styled/Container";
import Search from "./components/styled/Search";
import Input from "./components/styled/Search/Input";
import Suggested from "./components/styled/Search/Suggested";
import Button from "./components/styled/Search/_Button";
import useSearchSuggestions from "./hooks/matchedWords";

function App() {
  const {
    searchInput,
    matchedWord,
    suggestedWord,
    handleInputChange,
    handleSearchReset,
    handleSubmit,
    handleKeyDown,
  } = useSearchSuggestions();
  console.log(matchedWord);
  return (
    <Container>
      <Search>
        <Input
          placeholder="Masukkan kata disini"
          onChange={(e) => handleInputChange(e.target.value)}
          value={searchInput}
        />
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={handleSearchReset}>Reset</Button>
        {suggestedWord.length > 0 && (
          <Suggested>
            {suggestedWord.map((word) => (
              <p>{word.englishWord}</p>
            ))}
          </Suggested>
        )}
      </Search>
      <div>
        {matchedWord.map((word) => (
          <p>
            {word.targetWord} : {word.englishWord}
          </p>
        ))}
      </div>
    </Container>
  );
}

export default App;
