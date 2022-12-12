namespace Advent2022;

public static class Utils
{
    public static int GetAlphabeticalPosition(char c)
    {
        var alphabet = "abcdefghijklmnopqrstuvwxyz".ToCharArray().ToList();
        return alphabet.IndexOf(c);
    }
}