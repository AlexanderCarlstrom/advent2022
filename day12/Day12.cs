namespace Advent2022.Day12;

public class Day12
{
    private List<List<char>> _map = new();

    public Day12(string path)
    {
        var lines = File.ReadAllLines(path);

        for (var i = 0; i < lines.Length; i++)
        {
            var line = lines[i].ToCharArray().ToList();
            _map.Add(line);
        }
    }

    public void Part1()
    {
        Console.WriteLine("Part 1");
        
        var start = new Position();
        start.Row = _map.FindIndex(p => p.Contains('S'));
        start.Col = _map[start.Row].IndexOf('S');
        
        var end = new Position();
        end.Row = _map.FindIndex(p => p.Contains('E'));
        end.Col = _map[end.Row].IndexOf('E');
        
        start.SetDistance(end.Row, end.Col);
        Console.WriteLine(FindPath(start, end));
    }

    public void Part2()
    {
        Console.WriteLine("Part 2");
        var end = new Position();
        end.Row = _map.FindIndex(p => p.Contains('E'));
        end.Col = _map[end.Row].IndexOf('E');

        var lowest = new List<Position>();
        for (var i = 0; i < _map.Count; i++)
        {
            for (var j = 0; j < _map[i].Count; j++)
            {
                if (_map[i][j] == 'a')
                {
                    lowest.Add(new Position() { Row = i, Col = j });
                }
            }
        }

        var count = new List<int>();

        lowest = lowest.Where(p => !AllSame('a', p)).ToList();

        foreach (var pos in lowest)
        {
            count.Add(FindPath(pos, end));
        }
        
        Console.WriteLine(count.Order().First());
    }

    private bool AllSame(char letter, Position pos)
    {
        return GetAdjacent(pos).All(p => _map[p.Row][p.Col] == letter);
    }

    private int FindPath(Position start, Position end)
    {
        start.SetDistance(end.Row, end.Col);
        var active = new List<Position>();
        var visited = new List<Position>();
        
        active.Add(start);
        
        while (active.Any())
        {
            var check = active.OrderBy(p => p.CostDistance).First();

            if (Compare(check, end))
            {
                var current = check;
                var count = 0;
                
                while (!Compare(current, start))
                {
                    count++;

                    current = current.Parent;
                }
                
                return count;
            }

            visited.Add(check);
            active.Remove(check);
            
            var adjacent = GetAdjacent(check);

            foreach (var pos in adjacent)
            {
                if (visited.Any(p => Compare(pos, p))) continue;
                if (active.Any(p => Compare(pos, p)))
                {
                    var existingPos = active.First(p => Compare(pos, p));
                    if (existingPos.CostDistance > check.CostDistance)
                    {
                        active.Remove(existingPos);
                        active.Add(pos);
                    }
                }
                else
                {
                    active.Add(pos);
                }
            }
        }
        
        return 0;
    }

    private bool Compare(Position pos1, Position pos2)
    {
        return pos1.Row == pos2.Row && pos1.Col == pos2.Col;
    }

    private bool PositionExists(Position position)
    {
        return position.Row >= 0 && position.Row < _map.Count && position.Col >= 0 &&
               position.Col < _map[position.Row].Count;
    }

    private bool CheckHeight(Position tile1, Position tile2)
    {
        return GetAlphabeticalPosition(_map[tile2.Row][tile2.Col]) -
            GetAlphabeticalPosition(_map[tile1.Row][tile1.Col]) <= 1;
    }

    private List<Position> GetAdjacent(Position position)
    {
        var adjacent = new List<Position>
        {
            new() { Row = position.Row - 1, Col = position.Col, Parent = position },
            new() { Row = position.Row + 1, Col = position.Col, Parent = position },
            new() { Row = position.Row, Col = position.Col - 1, Parent = position },
            new() { Row = position.Row, Col = position.Col + 1, Parent = position },
        };

        return adjacent.Where(a => PositionExists(a) && CheckHeight(position, a)).ToList();
    }

    private int GetAlphabeticalPosition(char character)
    {
        return character switch
        {
            'S' => Utils.GetAlphabeticalPosition('a'),
            'E' => Utils.GetAlphabeticalPosition('z'),
            _ => Utils.GetAlphabeticalPosition(character)
        };
    }
}

class Position
{
    public int Row { get; set; }
    public int Col { get; set; }
    public int Cost { get; set; }
    public int Distance { get; set; }
    public int CostDistance => Cost + Distance;
    public Position Parent { get; set; }

    public void SetDistance(int targetRow, int targetCol)
    {
        Distance = Math.Abs(targetRow - Row) + Math.Abs(targetCol - Col);
    }
}